//AboutProject — компонент с описанием дипломного проекта.
import React from 'react';
import './index.sass';

export const AboutProject = () => {
  return (
    <section className='section section___about-project about-project'>
      <div className="container">
        <h3 className="about-project__title">О проекте</h3>
        <ul className="about-project__info info list">
          <li className="info__box info-box item">
            <span className="info-box__title">Дипломный проект включал 5 этапов</span>
            <p className="info-box__text">Составление плана, работу над бэкендом, вёрстку, добавление функциональности и финальные доработки.</p>
          </li>
          <li className="info__box info-box item">
            <span className="info-box__title">На выполнение диплома ушло 5 недель</span>
            <p className="info-box__text">У каждого этапа был мягкий и жёсткий дедлайн, которые нужно было соблюдать, чтобы успешно защититься.</p>
          </li>
        </ul>
        <ul className="about-project__timeline timeline list">
          <li className="timeline__box timeline__box_left timeline-box item">
            <div className="timeline-box__period timeline-box__period_left">1 неделя</div>
            <p className="timeline-box__type">Back-end</p>
          </li>
          <li className="timeline__box timeline__box_right timeline-box item">
            <div className="timeline-box__period timeline-box__period_right">4 недели</div>
            <p className="timeline-box__type">Front-end</p>
          </li>
        </ul>
      </div>
    </section>
  )
}
