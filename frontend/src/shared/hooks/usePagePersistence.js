import { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

/**
 * Хук для сохранения и восстановления состояния страницы
 * Обеспечивает остановку на пользовательской странице при обновлении
 */
export const usePagePersistence = (user) => {
    const location = useLocation();
    const navigate = useNavigate();
    const [isRestoring, setIsRestoring] = useState(true);

    useEffect(() => {
        // Сохраняем текущий путь при изменении
        if (location.pathname !== '/login' && location.pathname !== '/register') {
            localStorage.setItem('lastVisitedPath', location.pathname);
        }
    }, [location.pathname]);

    useEffect(() => {
        // Восстанавливаем состояние при загрузке
        const restoreState = () => {
            const lastPath = localStorage.getItem('lastVisitedPath');
            const savedUser = localStorage.getItem('user');
            
            if (savedUser && lastPath) {
                try {
                    const userData = JSON.parse(savedUser);
                    
                    // Если пользователь авторизован и есть сохраненный путь
                    if (userData && userData.id) {
                        // Проверяем, что путь не является переходом по ID другого пользователя
                        if (lastPath.startsWith('/user/') && !lastPath.includes(userData.id)) {
                            // Перенаправляем на страницу текущего пользователя
                            navigate(`/user/${userData.id}`, { replace: true });
                        } else if (lastPath !== location.pathname) {
                            // Восстанавливаем последний посещенный путь
                            navigate(lastPath, { replace: true });
                        }
                    }
                } catch (error) {
                    console.error('Error restoring state:', error);
                    localStorage.removeItem('lastVisitedPath');
                }
            }
            
            setIsRestoring(false);
        };

        restoreState();
    }, [user, navigate, location.pathname]);

    return { isRestoring };
};

/**
 * Хук для защиты от перехода по ID пользователя
 */
export const useUserProtection = (user) => {
    const location = useLocation();
    const navigate = useNavigate();

    useEffect(() => {
        // Проверяем, если пользователь пытается перейти на страницу другого пользователя
        if (user && location.pathname.startsWith('/user/')) {
            const pathUserId = location.pathname.split('/user/')[1];
            
            // Если ID в URL не совпадает с ID текущего пользователя
            if (pathUserId && pathUserId !== user.id) {
                console.warn('Attempted access to another user\'s page blocked');
                // Перенаправляем на страницу текущего пользователя
                navigate(`/user/${user.id}`, { replace: true });
            }
        }
    }, [user, location.pathname, navigate]);
};

/**
 * Хук для управления состоянием авторизации
 */
export const useAuthState = () => {
    const [user, setUser] = useState(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        // Восстанавливаем пользователя из localStorage
        const savedUser = localStorage.getItem('user');
        if (savedUser) {
            try {
                const userData = JSON.parse(savedUser);
                setUser(userData);
            } catch (error) {
                console.error('Error parsing saved user:', error);
                localStorage.removeItem('user');
            }
        }
        setIsLoading(false);
    }, []);

    const login = (userData) => {
        setUser(userData);
        localStorage.setItem('user', JSON.stringify(userData));
    };

    const logout = () => {
        setUser(null);
        localStorage.removeItem('user');
        localStorage.removeItem('lastVisitedPath');
    };

    return { user, isLoading, login, logout };
};
