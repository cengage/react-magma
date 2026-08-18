import React from 'react';

import { Meta, StoryObj } from '@storybook/react-webpack5';

import { Badge } from '../Badge';
import { Button } from '../Button';
import { Card, CardBody } from '../Card';
import { Tag } from '../Tag';

import { Skeleton, SkeletonAnimation, SkeletonProps, SkeletonVariant } from '.';

const meta: Meta<SkeletonProps> = {
  component: Skeleton,
  title: 'Skeleton',
  argTypes: {
    variant: {
      control: { type: 'select' },
      options: Object.values(SkeletonVariant),
    },
    animation: {
      control: { type: 'select' },
      options: Object.values(SkeletonAnimation),
    },
    width: {
      control: { type: 'text' },
    },
    height: {
      control: { type: 'text' },
    },
    hasAnimation: {
      control: { type: 'boolean' },
    },
    isInverse: {
      control: { type: 'boolean' },
    },
  },
};

export default meta;

type Story = StoryObj<SkeletonProps>;

export const Default: Story = {
  render: args => (
    <div style={{ width: 400 }}>
      <Skeleton {...args} />
    </div>
  ),
  args: {
    variant: SkeletonVariant.text,
  },
};

export const Variants: Story = {
  render: args => (
    <div
      style={{
        alignItems: 'center',
        display: 'flex',
        gap: 24,
        width: 500,
      }}
    >
      <Skeleton
        {...args}
        variant={SkeletonVariant.circle}
        width={48}
        height={48}
      />
      <div style={{ flex: 1 }}>
        <Skeleton {...args} variant={SkeletonVariant.text} />
        <Skeleton {...args} variant={SkeletonVariant.text} width="80%" />
        <Skeleton {...args} variant={SkeletonVariant.rounded} height={80} />
      </div>
    </div>
  ),
};

export const Text: Story = {
  render: args => (
    <div style={{ width: 400 }}>
      <Skeleton {...args} variant={SkeletonVariant.text} />
      <Skeleton {...args} variant={SkeletonVariant.text} />
      <Skeleton {...args} variant={SkeletonVariant.text} width="60%" />
    </div>
  ),
};

export const NoAnimation: Story = {
  render: args => (
    <div style={{ width: 400 }}>
      <Skeleton {...args} hasAnimation={false} />
      <Skeleton {...args} hasAnimation={false} width="70%" />
    </div>
  ),
};

/**
 * Wrap a component in `Skeleton` to reserve its exact dimensions while data
 * loads. The children are visually hidden but still occupy space, so the
 * skeleton shrinks to fit them. This works with any element or Magma component
 * and is best for fixed-size pieces such as avatars, buttons, icons, and tags.
 *
 * The first row shows the skeletons on their own. The second row starts as
 * skeletons and reveals the real content after 3 seconds, mimicking a load.
 */
export const InferredFromChildren: Story = {
  render: args => {
    const [isLoading, setIsLoading] = React.useState(true);

    React.useEffect(() => {
      const timer = setTimeout(() => setIsLoading(false), 3000);

      return () => clearTimeout(timer);
    }, []);

    const avatar = (
      <span
        style={{
          background: '#5d65cb',
          borderRadius: '50%',
          display: 'inline-block',
          height: 48,
          width: 48,
        }}
      />
    );

    const items = [
      { variant: SkeletonVariant.circle, node: avatar },
      { variant: SkeletonVariant.rounded, node: <Button>Button</Button> },
      { variant: SkeletonVariant.rounded, node: <Tag>Tag</Tag> },
      { variant: SkeletonVariant.rounded, node: <Badge>99+</Badge> },
    ];

    const rowStyle: React.CSSProperties = {
      alignItems: 'center',
      display: 'flex',
      gap: 16,
      minHeight: 48,
    };

    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
        <div style={rowStyle}>
          {items.map((item, index) => (
            <Skeleton key={index} {...args} variant={item.variant}>
              {item.node}
            </Skeleton>
          ))}
        </div>
        <div style={rowStyle}>
          {items.map((item, index) =>
            isLoading ? (
              <Skeleton key={index} {...args} variant={item.variant}>
                {item.node}
              </Skeleton>
            ) : (
              <React.Fragment key={index}>{item.node}</React.Fragment>
            )
          )}
        </div>
      </div>
    );
  },
};

/**
 * The `animation` prop switches the animation style. `shimmer` (the default)
 * sweeps a sheen left to right, while `pulse` gently blinks the whole shape.
 */
export const Pulse: Story = {
  args: {
    animation: SkeletonAnimation.pulse,
  },
  render: args => (
    <div style={{ width: 400 }}>
      <Skeleton {...args} variant={SkeletonVariant.text} />
      <Skeleton {...args} variant={SkeletonVariant.text} />
      <Skeleton {...args} variant={SkeletonVariant.text} width="60%" />
    </div>
  ),
};

/**
 * For dynamic or complex components whose size is not fixed (for example a form
 * that can grow or shrink), don't wrap the component. Instead, compose skeleton
 * primitives to approximate the layout you expect. This keeps you in control of
 * the placeholder's dimensions regardless of the real content.
 */
export const ComposedLayout: Story = {
  render: args => (
    <Card style={{ width: 360 }}>
      <CardBody>
        {[0, 1, 2].map(index => (
          <div key={index} style={{ marginBottom: index < 2 ? 24 : 0 }}>
            <Skeleton {...args} variant={SkeletonVariant.text} width="30%" />
            <Skeleton {...args} variant={SkeletonVariant.rounded} height={40} />
          </div>
        ))}
      </CardBody>
    </Card>
  ),
};

/**
 * A fake media card UI, showing how skeletons approximate the real content
 * layout while it loads.
 */
export const CardExample: Story = {
  render: args => (
    <Card style={{ width: 320 }}>
      <CardBody>
        <Skeleton {...args} variant={SkeletonVariant.rectangle} height={160} />
        <div style={{ marginTop: 16 }}>
          <Skeleton {...args} variant={SkeletonVariant.text} />
          <Skeleton {...args} variant={SkeletonVariant.text} width="90%" />
          <Skeleton {...args} variant={SkeletonVariant.text} width="60%" />
        </div>
      </CardBody>
    </Card>
  ),
};

/**
 * A fake list UI combining circle avatars with text lines.
 */
export const ListExample: Story = {
  render: args => (
    <Card style={{ width: 360 }}>
      <CardBody>
        {[0, 1, 2].map(index => (
          <div
            key={index}
            style={{
              alignItems: 'center',
              display: 'flex',
              gap: 16,
              marginBottom: index < 2 ? 24 : 0,
            }}
          >
            <Skeleton
              {...args}
              variant={SkeletonVariant.circle}
              width={40}
              height={40}
            />
            <div style={{ flex: 1 }}>
              <Skeleton {...args} variant={SkeletonVariant.text} />
              <Skeleton {...args} variant={SkeletonVariant.text} width="70%" />
            </div>
          </div>
        ))}
      </CardBody>
    </Card>
  ),
};

export const Inverse: Story = {
  args: {
    isInverse: true,
  },
  render: args => (
    <Card isInverse style={{ width: 360 }}>
      <CardBody>
        <div
          style={{
            alignItems: 'center',
            display: 'flex',
            gap: 16,
          }}
        >
          <Skeleton
            {...args}
            variant={SkeletonVariant.circle}
            width={40}
            height={40}
          />
          <div style={{ flex: 1 }}>
            <Skeleton {...args} variant={SkeletonVariant.text} />
            <Skeleton {...args} variant={SkeletonVariant.text} width="70%" />
          </div>
        </div>
      </CardBody>
    </Card>
  ),
};

/**
 * Renders 100 rows (300 skeletons) at once to confirm the animations and
 * rendering stay smooth at scale. The component is a lightweight styled element
 * with no per-instance timers or effects, and Emotion reuses a single generated
 * class for identical skeletons, so hundreds of instances stay performant.
 */
export const ManySkeletons: Story = {
  render: args => {
    const rows = React.useMemo(
      () => Array.from({ length: 100 }, (_, index) => index),
      []
    );

    return (
      <div
        style={{
          display: 'grid',
          gap: 16,
          gridTemplateColumns: 'repeat(auto-fill, minmax(240px, 1fr))',
        }}
      >
        {rows.map(row => (
          <div
            key={row}
            style={{ alignItems: 'center', display: 'flex', gap: 12 }}
          >
            <Skeleton
              {...args}
              variant={SkeletonVariant.circle}
              width={40}
              height={40}
            />
            <div style={{ flex: 1 }}>
              <Skeleton {...args} variant={SkeletonVariant.text} />
              <Skeleton {...args} variant={SkeletonVariant.text} width="70%" />
            </div>
          </div>
        ))}
      </div>
    );
  },
};
