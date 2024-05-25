import styled from 'styled-components';

export const StyledSummitResultsView = styled.section`
  padding-top: 60px;
  margin-bottom: 140px;
`;

export const StyledResultInfo = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 60px;

  .desc {
    font-size: 18px;
    line-height: 26px;
    color: ${({ theme }) => theme.palette.dark};
  }

  .left {
    width: 508px;
    max-width: 32%;

    .title {
      margin-bottom: 40px;
    }
  }

  .right {
    display: grid;
    grid-template-columns: repeat(3, 260px);
    align-self: center;
    border: ${({ theme }) => `1px solid ${theme.palette.gray}`};

    .result {
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      height: 220px;
      padding: 24px 32px;
      border-right: ${({ theme }) => `1px solid ${theme.palette.gray}`};

      &:last-child {
        border-right: 0;
      }

      .count {
        color: ${({ theme }) => theme.palette.blue1};
        font-size: 60px;
        line-height: 76px;
      }
    }
  }
`;

export const StyledPlayerContent = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: ${({ theme }) => theme.palette.dark};
    opacity: 40%;
  }
`;

export const StyledPlayerButton = styled.button`
  width: 80px;
  height: 80px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  border-radius: 50%;
  color: ${({ theme }) => theme.palette.white};
  background-color: rgb(255 255 255 / 10%);
  border: 1px solid rgb(255 255 255 / 30%);
  transition: ${({ theme }) => `transform ${theme.durations.hover}`};
  z-index: 1;

  &:active {
    transform: scale(0.92);
  }
`;
