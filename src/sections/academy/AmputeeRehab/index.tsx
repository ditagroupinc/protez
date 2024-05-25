// import {
//   StyledSummitContent,
//   StyledSummitOverlay,
//   StyledSummitView,
// } from '@/views/SummitView/SummitView.styles'

import { icons } from './icons'

import Button from '@/components/Button'
import { AcademySection } from '@/components/AcademySection'

// import { AspectRatio } from '@/components/AspectRatio'
// import { Button } from '@/components/Button'

import AmputeeRehabLogoSVG from '@/assets/icons/amputee-rehab-logo.svg?react'
import ArrowUpSVG from '@/assets/icons/arrow-up.svg?react'
import summitJPG from '@/assets/images/summit.jpg'
import DirectReliefSVG from '@/assets/partners/direct-relief.svg?react'
import DitaGroupSVG from '@/assets/partners/dita-group.svg?react'
import EsperSVG from '@/assets/partners/esper.svg?react'

const AmputeeRehab = () => {
  return (
    <StyledSummitView>
      <AspectRatio src={summitJPG} aspectRatio={1920 / 880}>
        <StyledSummitOverlay>
          <StyledSummitContent>
            <div className="left">
              <AmputeeRehabLogoSVG />
              <p className="desc">
                Lorem ipsum dolor sit amet consectetur. Turpis pulvinar odio pulvinar mi diam.
                Vestibulum nec nec commodo tincidunt sed iaculis lectus. Volutpat ultricies nunc
                suspendisse donec varius integer nisi urna eu. Egestas et id nunc ultrices sit ut
              </p>
              <div className="buttons">
                <Button variant="primary-blue" size="big">
                  Apply to Academy
                </Button>
                <Button variant="secondary-white" size="big">
                  Support Academy
                  <ArrowUpSVG />
                </Button>
              </div>
            </div>
            <div className="right">
              <div className="card grid-1-2">
                <EsperSVG />
              </div>
              <div className="card grid-2-2">
                <DirectReliefSVG />
              </div>
              <div className="card grid-3-2">
                <DitaGroupSVG />
              </div>
            </div>
          </StyledSummitContent>
        </StyledSummitOverlay>
      </AspectRatio>
    </StyledSummitView>
  )
}

export default AmputeeRehab
