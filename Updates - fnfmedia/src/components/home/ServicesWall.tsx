import { ArrowRight } from 'lucide-react'
import BrandLogos from '@/components/home/BrandLogos'
import ServiceIcon from '@/components/home/ServiceIcon'
import Wall, { Lines } from '@/components/home/Wall'
import Go from '@/components/page/Go'
import { serviceBlocks } from '@/data/home'

/** Every service stays on show, with what it includes, so nobody has to hunt for what we sell. */
export default function ServicesWall() {
  return (
    <Wall id="services" wall="services" label="Services" exit="dolly-back" className="services-scene">
      <div className="wall__body">
        <div className="services-head">
          <Lines className="wall-h" lines={['Build the asset.', 'Drive the traffic.']} />
          <p className="wall-lead">Three services, one team. Take the one you need, or have us run all three.</p>
        </div>
        <div className="service-tabs">
          {serviceBlocks.map((block, index) => (
            <button key={block.id} type="button" data-card={index}>
              {block.short}
            </button>
          ))}
          <span aria-hidden="true" className="service-tabs__mark" />
        </div>
        <ul className="service-trio" data-row>
          {serviceBlocks.map((block) => (
            <li key={block.id} id={block.id} className={`service-card service-card--${block.tone}`}>
              <img src={block.image} alt="" decoding="sync" className="service-card__art" />
              <div className="service-card__in">
                <h3>{block.title}</h3>
                <p>{block.summary}</p>
                <ul className="service-list">
                  {block.options.map((option, index) => (
                    <li key={option.label}>
                      <Go href={option.href} className="service-row">
                        <span aria-hidden="true" className="service-row__no">
                          {String(index + 1).padStart(2, '0')}
                        </span>
                        <span className="service-row__label">{option.label}</span>
                        {option.brand && <ServiceIcon name={option.brand} />}
                        <ArrowRight aria-hidden="true" className="service-row__go" />
                      </Go>
                    </li>
                  ))}
                </ul>
                <Go href={block.href} className="wall-btn wall-btn--solid">
                  Learn more
                </Go>
              </div>
            </li>
          ))}
        </ul>
        <BrandLogos className="client-strip" />
      </div>
    </Wall>
  )
}
