import React, {Component} from 'react';
import { Parallax, Background } from 'react-parallax';
import './GeneralLanding.css';

class GeneralLanding extends Component {
  render() {
    return (
      <div className="about">
        <Parallax
          // blur={0}
          bgImage={require('../../static/img/3.jpg')}
          bgImageAlt="flowerFirst"
          strength={700}
        >
          <h1>Дарить приятнее чем получать</h1>
        </Parallax>

        <Parallax
          bgImage={require('../../static/img/2.jpg')}
          bgImageAlt="flower_2"
          strength={700}
        >
          <h1>Уютный дом это то место, куда хочется возвращаться.</h1>
        </Parallax>

        <Parallax
          bgImage={require('../../static/img/1.jpg')}
          bgImageAlt="flower_3"
          strength={700}
        >
          <h1>Чтобы радовать близких не всегда нужен повод</h1>
        </Parallax>

        <Parallax
          bgImage={require('../../static/img/4.jpg')}
          bgImageAlt="flower_4"
          strength={700}
        >
          <h1>Выбери то что подходит больше всего</h1>
        </Parallax>

        <Parallax
          bgImage={require('../../static/img/5_1.jpg')}
          bgImageAlt="the dog"
          strength={700}
        >
          {/*<div style={{ height: '2000px' }} />*/}
          <h1>тут будет какойто текст или уже футер</h1>

        </Parallax>
      </div>
    );
  }
}
export default GeneralLanding