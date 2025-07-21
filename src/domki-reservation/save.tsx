import { InnerBlocks, useBlockProps } from '@wordpress/block-editor';
import React from 'react';
import { AttributesI } from './types';
interface PropsI {
  attributes: AttributesI;
}
const ThemeUrl = 'wpApiSettings.theme_url';
const PageUrl = window.location.protocol + '//' + window.location.host;

export default function save({ attributes }: PropsI) {
  return (
    <div {...useBlockProps.save()}>
      <section className="oferta-section" id={attributes.identifier}>
        <div className="container">
          <h1 id="oferta-target">{attributes.title}</h1>

          <div className="of">
            <p dangerouslySetInnerHTML={{ __html: attributes.promotion_text }} className="oferta"></p>
          </div>

          <div className="btns">
            <div className="btn cp btn-left oferta6 btn-oferta btn--active">
              <div className="circle"></div>
              <p>DO 6 OSÓB</p>
              <img loading="lazy" src={ThemeUrl + '/assets/6x_ludzikow.svg'} alt="Promocja do 6 osób" />
            </div>
            <div className="btn cp btn-right oferta8 btn-oferta">
              <div className="circle"></div>
              <p>DO 8 OSÓB</p>
              <img loading="lazy" src={ThemeUrl + '/assets/8x_ludzikow.svg'} alt="Promocja do 6 osób" />
            </div>
          </div>
          <div className="oferty">
            <div className="oferta-1 promocja">
              <h4>{attributes.promo_1.line_1}</h4>
              <p>{attributes.promo_1.line_2}</p>
              <div className="icona over-hidden">
                <img
                  loading="lazy"
                  data-aos="fade-up"
                  data-aos-delay={0}
                  src={attributes.promo_1.url}
                  alt="promo 1 icon"
                />
              </div>
              <div className="cena" data-cena-1={attributes.promo_1.price_1} data-cena-2={attributes.promo_1.price_2}>
                {attributes.promo_1.price_1}
              </div>
              <div
                data-start={attributes.promo_1.from}
                data-finish={attributes.promo_1.to}
                className="btn ucase cp btn-g-fix"
              >
                Rezerwuj
              </div>
            </div>
            <div className="oferta-2 promocja">
              <h4>{attributes.promo_2.line_1}</h4>
              <p>{attributes.promo_2.line_2}</p>
              <div className="icona over-hidden">
                <img
                  loading="lazy"
                  data-aos="fade-up"
                  data-aos-delay={100}
                  src={attributes.promo_2.url}
                  alt="promo 1 icon"
                />
              </div>
              <div className="cena" data-cena-1={attributes.promo_2.price_1} data-cena-2={attributes.promo_2.price_2}>
                {attributes.promo_2.price_1}
              </div>
              <div
                data-start={attributes.promo_2.from}
                data-finish={attributes.promo_2.to}
                className="btn ucase cp btn-g-fix"
              >
                Rezerwuj
              </div>
            </div>
            <div className="oferta-3 promocja">
              <h4>{attributes.promo_3.line_1}</h4>
              <p>{attributes.promo_3.line_2}</p>
              <div className="icona over-hidden">
                <img
                  loading="lazy"
                  data-aos="fade-up"
                  data-aos-delay={200}
                  src={attributes.promo_3.url}
                  alt="promo 1 icon"
                />
              </div>
              <div className="cena" data-cena-1={attributes.promo_3.price_1} data-cena-2={attributes.promo_3.price_2}>
                {attributes.promo_3.price_1}
              </div>
              <div
                data-start={attributes.promo_3.from}
                data-finish={attributes.promo_3.to}
                className="btn ucase cp btn-g-fix"
              >
                Rezerwuj
              </div>
            </div>
            <div className="oferta-4 promocja">
              <h4>{attributes.promo_4.line_1}</h4>
              <p>{attributes.promo_4.line_2}</p>
              <div className="icona over-hidden">
                <img
                  loading="lazy"
                  data-aos="fade-up"
                  data-aos-delay={300}
                  src={attributes.promo_4.url}
                  alt="promo 1 icon"
                />
              </div>
              <div className="cena" data-cena-1={attributes.promo_4.price_1} data-cena-2={attributes.promo_4.price_2}>
                {attributes.promo_4.price_1}
              </div>
              <div
                data-start={attributes.promo_4.from}
                data-finish={attributes.promo_4.to}
                className="btn ucase cp btn-g-fix"
              >
                Rezerwuj
              </div>
            </div>
          </div>
          <div className="content text-center" dangerouslySetInnerHTML={{ __html: attributes.reservation_text }}></div>
          <br />
          <div data-href={attributes.button.url} className="btn-text button button-reservation-clear">
            {attributes.button.text}
          </div>
        </div>
      </section>
    </div>
  );
}
