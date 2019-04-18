import * as Rebass from 'rebass'
import { withProps } from 'recompose'
import styled, { css } from 'styled-components'

// @ts-ignore
import * as AdaptiveCommon from '@adaptive-insights/common'

export { ViewportFlex } from './ViewportRow'

export const Background = styled(Rebass.Box)`
  color: ${({ theme }) => theme.core.textColor};
  background-image: linear-gradient(323deg, ${({ theme }) => theme.core.darkBackground});
`

export const Root = (Background.withComponent(Rebass.Flex) as any).extend`
  height: 100%;
  width: 100%;
`

export const Divider = styled((Rebass as any).Border).attrs({
  borderWidth: 2,
  color: (props: any) => (props.soft ? 'offwhite50' : 'accent'),
  my: 2,
  top: true,
})`
  flex: 1 100%;
`

export const Gutter = withProps({ p: [1, 2] })(Rebass.Box as any)

export const textProps = AdaptiveCommon.mapProps({
  caps: css`
    text-transform: uppercase;
    letter-spacing: 0.0625rem;
  `,
  display: {
    inline: css`
      display: inline;
    `,
  },
  fontStyle: {
    italic: css`
      font-style: italic;
    `,
  },
  lineHeight: (lineHeight: any) =>
    css`
      line-height: ${lineHeight};
    `,
  weight: {
    bold: css`
      font-weight: 600;
    `,
    default: (weight: any) => css`
      font-weight: ${weight};
    `,
    light: css`
      font-weight: 200;
    `,
    regular: css`
      font-weight: 300;
    `,
  },
})

export const Text = styled(Rebass.Text).attrs({ is: 'div' })`
  ${textProps};
`
export const Heading = styled(Rebass.Heading)`
  ${textProps};
`
export const Lead = styled((Rebass as any).Lead)`
  ${textProps};
  color: ${props => props.theme.colors.offwhite};
`
export const Small = styled((Rebass as any).Small)`
  ${textProps};
  color: ${props => props.theme.colors[props.color || 'white']};
`
export const Label = styled(Rebass.Text)`
  ${textProps};
  opacity: 0.59;
  font-size: smaller;
`
export const Caption = styled((Rebass as any).Small)`
  ${textProps};
  color: ${props => props.theme.colors[props.color || 'white']};
  opacity: 0.59;
  display: block;
  line-height: 1rem;
  margin-top: 0.25rem;
  margin-bottom: 0.25rem;
`

export const BlockLink = styled(Text).attrs({ is: 'a', f: 0 })`
  ${textProps};
  display: block;
`

export const HyperLinkedLead = styled((Rebass as any).Small)`
  ${textProps};
  color: ${props => props.theme.colors[props.color || 'white']};
  &:hover {
    color: ${(props: any) => props.theme.colors.gold};
  }
`
export const HyperLinkedBlockLink = styled(Text).attrs({ is: 'a', f: 0 })`
  ${textProps};
  display: block;
  &:hover {
    color: ${(props: any) => props.theme.colors.gold};
  }
`
