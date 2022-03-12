import styled, { createGlobalStyle } from 'styled-components'

export const GlobalStyle = createGlobalStyle`
  body {
    background-color: ${props => props.theme.colors.body}; 
    transition: color .3s linear;
    transition: background-color .3s linear;
    font-family: 'Montserrat';
    font-size: 16px;
  }

  ::-moz-selection {
  background: ${props => props.theme.colors.backgroundSecondary};
  color: ${props => props.theme.colors.text}
  } 

  ::selection {
    background: ${props => props.theme.colors.backgroundSecondary};
    color: ${props => props.theme.colors.text}
  }

  .ant-tabs-top>.ant-tabs-nav .ant-tabs-ink-bar, .ant-tabs-top>.ant-tabs-nav:before, .ant-tabs-top>div>.ant-tabs-nav .ant-tabs-ink-bar, .ant-tabs-top>div>.ant-tabs-nav:before { 
    bottom: 1px;
    background: ${props => props.theme.colors.backgroundSecondary};
  }
  
  .ant-tabs-bottom>.ant-tabs-nav:before, .ant-tabs-bottom>div>.ant-tabs-nav:before, .ant-tabs-top>.ant-tabs-nav:before, .ant-tabs-top>div>.ant-tabs-nav:before 
  {
    border-bottom: 1px solid ${props => props.theme.colors.text};
  }
  .ant-select:not(.ant-select-customize-input) .ant-select-selector { 
    background-color: inherit; 
    border-radius: ${props => props.theme.borderRadius};
    border: 0;
  }
  .ant-btn:focus, .ant-btn:hover { 
    background-color: ${props => props.theme.colors.backgroundSecondary}; 
    border-color:  ${props => props.theme.colors.backgroundSecondary};
  }
  .ant-select{
    border-radius: ${props => props.theme.borderRadius};
    border: 0;
    color: ${props => props.theme.colors.text};
    background-color: ${props => props.theme.colors.backgroundPrimary}; 
  }
  .ant-select-single.ant-select-open .ant-select-selection-item { 
    color: ${props => props.theme.colors.text};
  }
  .ant-select-dropdown { 
    background-color: ${props => props.theme.colors.backgroundPrimary}; 
    color: ${props => props.theme.colors.text}; 
    .ant-select-item { 
      color: inherit;
      &-option-selected:not(.ant-select-item-option-disabled) { 
        background-color: ${props => props.theme.colors.backgroundSecondary}; 
      }
      &-option-active:not(.ant-select-item-option-disabled) { 
        background-color: ${props => props.theme.colors.backgroundSecondary}; 
      }
    }
  }
  .ant-select-selection-placeholder {
    color: ${props => props.theme.colors.text};
    opacity: .7;
  }
  .ant-drawer-header { 
    background-color: ${props => props.theme.colors.backgroundPrimary};
    color: ${props => props.theme.colors.text};
    border-bottom: 1px solid ${props => props.theme.colors.backgroundSecondary};
    border-radius: 0;
    height: 50px;
  }
  .ant-drawer-body { 
    background-color: ${props => props.theme.colors.backgroundMain};
    color: ${props => props.theme.colors.text};
  }
`
const mediaQuery = (maxWidth: number) => `@media (max-width: ${maxWidth}px)`
const mediaQueryMobile = (minWidth: number) => `@media (min-width: ${minWidth}px)`
export const media = {
  md: mediaQuery,
  mmd: mediaQuery,

  md1: mediaQuery(1191),
  mmd1: mediaQueryMobile(1191),

  md2: mediaQuery(991),
  mmd2: mediaQueryMobile(991),

  md3: mediaQuery(767),
  mmd3: mediaQueryMobile(767),

  md4: mediaQuery(480),
  mmd4: mediaQueryMobile(480),
}

export const Container = styled.div`
  max-width: ${props => props.theme.maxWidthContainer};
  width: 100%;
  margin: 0 auto;
  padding: 0 20px;

  ${media.md1} {
    max-width: 970px;
  }
  ${media.md2} {
    max-width: 750px;
  }
  ${media.md3} {
    max-width: none;
    padding: 0 10px;
  }
`
