import * as React from 'react';
import { makeMergeProps } from '@fluentui/react-utilities';
import { PresenceBadgeProps, PresenceBadgeState, PresenceBadgeStatus } from './PresenceBadge.types';
import { useBadge, BadgeProps } from '../Badge/index';
import {
  SkypeMinusIcon,
  SkypeClockIcon,
  SkypeArrowIcon,
  SkypeCheckIcon,
  CancelIcon,
} from './DefaultPresenceBadgeIcons';

/**
 * Consts listing which props are shorthand props.
 */
export const presenceBadgeShorthandProps: (keyof PresenceBadgeProps)[] = ['icon'];

const mergeProps = makeMergeProps<PresenceBadgeState>({ deepMerge: presenceBadgeShorthandProps });

const iconMap: (outOfOffice: boolean) => Record<PresenceBadgeStatus, JSX.Element | null> = outOfOffice => ({
  busy: <SkypeMinusIcon />,
  available: outOfOffice ? <SkypeArrowIcon /> : <SkypeCheckIcon />,
  away: outOfOffice ? <SkypeArrowIcon /> : <SkypeClockIcon />,
  offline: <CancelIcon />,
  outOfOffice: <SkypeArrowIcon />,
  doNotDisturb: null,
});

/**
 * Returns the props and state required to render the component
 */
export const usePresenceBadge = (
  props: PresenceBadgeProps,
  ref: React.Ref<HTMLElement>,
  defaultProps?: PresenceBadgeProps,
): PresenceBadgeState => {
  const state = useBadge(
    props,
    ref,
    mergeProps(
      {
        size: 'small',
        status: 'available',
        outOfOffice: false,
        icon: { as: 'span' },
      },
      defaultProps,
    ) as BadgeProps,
  ) as PresenceBadgeState;

  if (!state.icon?.children) {
    state.icon!.children = iconMap(state.outOfOffice)[state.status];
  }

  return state;
};
