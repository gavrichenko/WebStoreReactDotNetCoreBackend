import React from 'react';
import { YMaps, Map, Placemark } from 'react-yandex-maps';

const mapState = { center: [57.621489, 39.882587], zoom: 14 };

function YandexMap() {
  return(
    <div className="yMap">
      <YMaps>
        <Map state={mapState}>
          <Placemark
            geometry={{
              coordinates: mapState.center,
            }}
            properties={{
              hintContent: 'Мы находимся прямо в центре',
              balloonContent: 'г. Ярославль, Октябрьский переулок - 555'
            }}
          />
        </Map>
      </YMaps>
    </div>
  )
}

export default YandexMap;