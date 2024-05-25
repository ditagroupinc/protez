import { StyledPlayerButton, StyledPlayerContent, StyledResultInfo, StyledSummitResultsView } from '@/views/SummitResultsView/SummitResultsView.styles';

import { AspectRatio } from '@/components/AspectRatio';
import { Container } from '@/components/Container';
import { SectionTitle } from '@/components/SectionTitle';

import PlaySVG from '@/assets/icons/play.svg?react';
import summitJPG from '@/assets/images/summit.jpg';

export const SummitResultsView = () => {
  return (
    <StyledSummitResultsView>
      <Container>
        <StyledResultInfo>
          <div className="left">
            <SectionTitle align="left" className="title">
              <span className="playfair">Summit</span>
              <br />
              <span className="nunito">Results</span>
            </SectionTitle>
            <p className="desc">
              Lorem ipsum dolor sit amet consectetur. Turpis pulvinar odio pulvinar mi diam. Vestibulum nec nec commodo tincidunt sed iaculis lectus. Volutpat ultricies nunc suspendisse donec
            </p>
          </div>
          <div className="right">
            <div className="result">
              <span className="count">200</span>
              <p className="desc">Visitors</p>
            </div>
            <div className="result">
              <span className="count">22</span>
              <p className="desc">Invited guests</p>
            </div>
            <div className="result">
              <span className="count">12</span>
              <p className="desc">Prosthetists</p>
            </div>
          </div>
        </StyledResultInfo>
        <AspectRatio src={summitJPG} aspectRatio={1584 / 800}>
          <StyledPlayerContent>
            <StyledPlayerButton>
              <PlaySVG height={32} width={32} />
            </StyledPlayerButton>
          </StyledPlayerContent>
        </AspectRatio>
      </Container>
    </StyledSummitResultsView>
  );
};
