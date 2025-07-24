import { Op, literal } from 'sequelize';
import { PlaceModel } from './model.js';
import { sequelize } from '../../config/database.js';
import { logger } from '../../core/logger.js';

// Инициализируем модель с экземпляром sequelize
const Place = PlaceModel(sequelize);

class GeoDataService {
    async listPlaces({ tags, bbox, near, limit = 100 }) {
        const whereClauses = [];

        if (tags) {
        const arr = Array.isArray(tags) ? tags : [tags];
        whereClauses.push({ tags: { [Op.overlap]: arr } });
        }

        if (bbox) {
        const [minLng, minLat, maxLng, maxLat] = bbox.split(',').map(Number);
        whereClauses.push(
            literal(`geom && ST_MakeEnvelope(${minLng}, ${minLat}, ${maxLng}, ${maxLat}, 4326)`)
        );
        }

        if (near) {
        const [lng, lat, radius] = near.split(',').map(Number);
        whereClauses.push(
            literal(`ST_DWithin(
            geom::geography,
            ST_SetSRID(ST_MakePoint(${lng}, ${lat}), 4326)::geography,
            ${radius}
            )`)
        );
        }

        const whereOption = whereClauses.length === 0 ? undefined : { [Op.and]: whereClauses };

        const places = await Place.findAll({
        where: whereOption,
        limit: Number(limit),
        order: [['id', 'ASC']],
        });

        logger.info(`Service: Fetched ${places.length} places`);
        return places;
    }

    async createPlace({ name, description, tags, coordinates, properties }) {
        const place = await Place.create({
        name,
        description,
        tags,
        properties,
        geom: { type: 'Point', coordinates },
        });

        logger.info(`Service: Created place: ${name}`);
        return place;
    }
}

const geoDataService = new GeoDataService();
export { geoDataService };