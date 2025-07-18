// Импорт необходимых модулей из React и OpenLayers
import { useEffect, useRef, useState } from 'react'; // React хуки для управления состоянием и эффектами
import { Map, View } from 'ol'; // Основные классы OpenLayers для создания карты
import TileLayer from 'ol/layer/Tile'; // Слой для тайлов карты (например, OpenStreetMap)
import OSM from 'ol/source/OSM'; // Источник данных для тайлов OpenStreetMap
import Feature from 'ol/Feature'; // Класс для создания объектов на карте (точки, линии)
import Point from 'ol/geom/Point'; // Геометрия для точек
import LineString from 'ol/geom/LineString'; // Геометрия для линий (маршрута)
import VectorLayer from 'ol/layer/Vector'; // Слой для векторных объектов (точки, линии)
import VectorSource from 'ol/source/Vector'; // Источник данных для векторных объектов
import { fromLonLat } from 'ol/proj'; // Функция для преобразования координат [lon, lat] в проекцию карты
import { Style, Icon, Text, Fill, Stroke } from 'ol/style'; // Стили для оформления объектов на карте
import volgogradPlaces from '../data/VolgogradPlaces'; // Статические данные с местами в Волгограде

// Определение компонента MapComponent
const MapComponent = () => {
  // Создание ссылки для DOM-элемента карты
  const mapRef = useRef(null);
  // Состояние для хранения ошибок (например, "Failed to fetch" или HTTP 429)
  const [error, setError] = useState(null);
  // Состояние для начальной точки маршрута (может быть из volgogradPlaces или случайной)
  const [startPoint, setStartPoint] = useState(null);
  // Состояние для конечной точки маршрута (по умолчанию вторая точка из volgogradPlaces)
  const [endPoint, setEndPoint] = useState(volgogradPlaces[1]?.coordinates);

  // Функция для генерации случайных координат в пределах Волгограда
  // Используется для тестирования маршрутов с рандомными начальными точками
  const generateRandomLocation = () => {
    const minLon = 44.4; // Минимальная долгота для Волгограда
    const maxLon = 44.6; // Максимальная долгота
    const minLat = 48.6; // Минимальная широта
    const maxLat = 48.8; // Максимальная широта
    const lon = minLon + Math.random() * (maxLon - minLon); // Случайная долгота
    const lat = minLat + Math.random() * (maxLat - minLat); // Случайная широта
    return [lon, lat]; // Возвращает массив [долгота, широта]
  };

  // Хук useEffect для инициализации карты и маршрута
  useEffect(() => {
    // Лог для отладки: выводим данные volgogradPlaces
    console.log('useEffect started. volgogradPlaces:', volgogradPlaces);

    // Проверка наличия данных в volgogradPlaces
    if (!volgogradPlaces || volgogradPlaces.length < 2) {
      setError('Недостаточно данных в volgogradPlaces');
      console.error('volgogradPlaces is empty or insufficient:', volgogradPlaces);
      return; // Прерываем выполнение, если данных недостаточно
    }

    // Установка начальной точки, если она ещё не задана
    // Используем первую точку из volgogradPlaces или случайную
    if (!startPoint) {
      setStartPoint(volgogradPlaces[0]?.coordinates || generateRandomLocation());
    }

    // Создание источника для меток (точек интереса из volgogradPlaces)
    const vectorSource = new VectorSource();
    volgogradPlaces.forEach((place) => {
      // Проверяем, что координаты места корректны
      if (place.coordinates && Array.isArray(place.coordinates) && place.coordinates.length === 2) {
        // Создаём объект (Feature) для каждой точки
        const feature = new Feature({
          geometry: new Point(fromLonLat(place.coordinates)), // Преобразуем координаты в проекцию карты
          name: place.name, // Название точки (например, "Мамаев Курган")
        });
        vectorSource.addFeature(feature); // Добавляем точку в источник
      } else {
        console.warn(`Некорректные координаты для места: ${place.name}`);
      }
    });

    // Создание источника для начальной точки (отдельно от других меток)
    const startSource = new VectorSource();
    if (startPoint) {
      const startFeature = new Feature({
        geometry: new Point(fromLonLat(startPoint)), // Координаты начальной точки
        name: 'Начальная точка', // Название для отображения
      });
      startSource.addFeature(startFeature); // Добавляем в источник
    }

    // Создание слоя для меток (точек интереса)
    const vectorLayer = new VectorLayer({
      source: vectorSource, // Источник данных для слоя
      style: (feature) =>
        new Style({
          image: new Icon({
            src: '/location-pin.svg', // Иконка для меток
            scale: 0.05, // Масштаб иконки
          }),
          text: new Text({
            text: feature.get('name'), // Название точки
            offsetY: -20, // Смещение текста
            font: '12px Arial', // Шрифт
            fill: new Fill({ color: '#000' }), // Цвет текста
            backgroundFill: new Fill({ color: '#fff' }), // Фон текста
            padding: [2, 2, 2, 2], // Отступы
          }),
        }),
    });

    // Создание слоя для начальной точки
    const startLayer = new VectorLayer({
      source: startSource,
      style: new Style({
        image: new Icon({
          src: '/user-location-pin.svg', // Отдельная иконка для начальной точки
          scale: 0.05,
        }),
        text: new Text({
          text: 'Начальная точка',
          offsetY: -20,
          font: '12px Arial',
          fill: new Fill({ color: '#000' }),
          backgroundFill: new Fill({ color: '#fff' }),
          padding: [2, 2, 2, 2],
        }),
      }),
    });

    // Создание источника и слоя для маршрута
    const routeSource = new VectorSource();
    const routeLayer = new VectorLayer({
      source: routeSource,
      style: new Style({
        stroke: new Stroke({
          color: '#ff0000', // Красная линия для маршрута
          width: 3, // Толщина линии
        }),
      }),
      zIndex: 10, // Устанавливаем z-индекс, чтобы маршрут был поверх других слоёв
    });

    // Инициализация карты OpenLayers
    const map = new Map({
      target: mapRef.current, // Привязываем карту к DOM-элементу
      layers: [
        new TileLayer({ source: new OSM() }), // Базовый слой OpenStreetMap
        vectorLayer, // Слой с метками
        startLayer, // Слой с начальной точкой
        routeLayer, // Слой с маршрутом
      ],
      view: new View({
        center: fromLonLat([44.5133, 48.7071]), // Центр карты (Волгоград)
        zoom: 12, // Начальный уровень масштаба
      }),
    });

    // Функция для получения маршрута через OSRM
    const fetchRoute = async (start, end) => {
      // Проверка корректности координат
      if (!start || !end || !Array.isArray(start) || !Array.isArray(end)) {
        setError('Некорректные координаты для маршрута');
        console.error('Invalid coordinates:', { start, end });
        return;
      }

      // Формируем URL для запроса к OSRM
      const url = `https://router.project-osrm.org/route/v1/driving/${start[0]},${start[1]};${end[0]},${end[1]}?overview=full&geometries=geojson`;
      console.log('Fetching route from:', url); // Лог для отладки URL

      try {
        // Отправляем запрос
        const response = await fetch(url);
        // Проверяем статус ответа
        if (!response.ok) {
          if (response.status === 429) {
            // Специфическая обработка ошибки 429 (Too Many Requests)
            setError('Слишком много запросов к серверу OSRM. Попробуйте позже');
            console.error('OSRM returned 429 Too Many Requests');
            return;
          }
          throw new Error(`HTTP ошибка: ${response.status}`);
        }
        // Получаем данные в формате JSON
        const data = await response.json();
        console.log('OSRM response:', data); // Лог ответа сервера

        // Проверяем наличие маршрута
        if (data.routes && data.routes.length > 0) {
          const route = data.routes[0].geometry.coordinates; // Координаты маршрута
          console.log('Route coordinates:', route);
          if (!route || route.length === 0) {
            throw new Error('Маршрут пустой');
          }
          // Преобразуем координаты в проекцию OpenLayers
          const routeCoords = route.map((coord) => fromLonLat([coord[0], coord[1]]));
          console.log('Transformed route coordinates:', routeCoords);
          // Создаём линию маршрута
          const routeFeature = new Feature({
            geometry: new LineString(routeCoords),
          });
          routeSource.clear(); // Очищаем предыдущий маршрут
          routeSource.addFeature(routeFeature); // Добавляем новый маршрут
          console.log('Route feature added to source');
          // Центрируем карту на маршруте
          map.getView().fit(routeFeature.getGeometry().getExtent(), {
            padding: [50, 50, 50, 50], // Отступы для видимости
            duration: 1000, // Анимация 1 секунда
          });
        } else {
          setError('Маршрут не найден: пустой ответ от OSRM');
          console.error('No routes in OSRM response:', data);
        }
      } catch (error) {
        // Обработка ошибок (например, "Failed to fetch")
        console.error('Ошибка при получении маршрута:', error);
        setError(`Ошибка при получении маршрута: ${error.message}`);
      }
    };

    // Вызываем fetchRoute, если координаты заданы
    if (startPoint && endPoint) {
      console.log('Calling fetchRoute with:', startPoint, endPoint);
      fetchRoute(startPoint, endPoint);
    }

    // Очистка карты при размонтировании компонента
    return () => map.setTarget(null);
  }, [startPoint, endPoint]); // Зависимости: обновляем при изменении точек

  // JSX для рендеринга UI
  return (
    <div>
      {/* Отображение ошибок в UI */}
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <div>
        {/* Кнопка для генерации случайной начальной точки */}
        <button onClick={() => setStartPoint(generateRandomLocation())}>
          Случайная начальная точка
        </button>
        {/* Выпадающий список для выбора начальной точки */}
        <select onChange={(e) => setStartPoint(volgogradPlaces[e.target.value]?.coordinates)}>
          <option value="">Выберите начальную точку</option>
          {volgogradPlaces.map((place, index) => (
            <option key={index} value={index}>{place.name}</option>
          ))}
        </select>
        {/* Выпадающий список для выбора конечной точки */}
        <select onChange={(e) => setEndPoint(volgogradPlaces[e.target.value]?.coordinates)}>
          <option value="">Выберите конечную точку</option>
          {volgogradPlaces.map((place, index) => (
            <option key={index} value={index}>{place.name}</option>
          ))}
        </select>
      </div>
      {/* Контейнер для карты */}
      <div ref={mapRef} className="map-container" style={{ height: '400px', width: '100%' }} />
    </div>
  );
};

// Экспорт компонента
export default MapComponent;