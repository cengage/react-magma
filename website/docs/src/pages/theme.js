import React from 'react';
import { Layout } from '../components/layout';
import styled from '@emotion/styled';

import {
  componentTypes,
  SchemaRenderer,
  Schema,
  templateTypes,
} from '@react-magma/schema-renderer';

import {
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionPanel,
  Alert,
  AlertVariant,
  Button,
  ButtonColor,
  ButtonIconPosition,
  ButtonSize,
  ButtonVariant,
  Card,
  CardBody,
  CardHeading,
  Checkbox,
  DatePicker,
  Drawer,
  DrawerPosition,
  Heading,
  IconButton,
  Input,
  Paragraph,
  ProgressBar,
  Radio,
  RadioGroup,
  Search,
  Select,
  TabsContainer,
  Tabs,
  Tab,
  TabPanelsContainer,
  TabPanel,
  Tag,
  Toggle,
  TypographyColor,
  TypographyVisualStyle,
} from '@react-magma/dom';

import {
  AccountCircleIcon,
  AddIcon,
  CodeIcon,
  PreviewIcon,
  SettingsIcon,
} from 'react-magma-icons';

import {
  convertThemeToCssVariables,
  ThemeContext,
  v3,
} from '@react-magma/themes';

const Wrapper = styled.div`
  ${props => convertThemeToCssVariables(props.theme)}
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr 1fr 1fr;
  grid-template-rows: auto;
  gap: 40px 40px;
  grid-auto-flow: row;
  grid-template-areas:
    'zero zero zero zero zero zero';
  width: 100%;
`;

const Container = styled.div`
  ${props => convertThemeToCssVariables(props.theme)}
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr 1fr 1fr;
  grid-template-rows: auto auto auto;
  gap: 40px 40px;
  grid-auto-flow: row;
  grid-template-areas:
    'one one one two two two'
    'three three three three four four'
    'five five six six six six';
`;

const Zero = styled.div`
  grid-area: zero;
  justify-self: end;
`;

const One = styled.div`
  grid-area: one;
`;
const Two = styled.div`
  grid-area: two;
`;
const Three = styled.div`
  grid-area: three;
`;
const Four = styled.div`
  grid-area: four;
`;
const Five = styled.div`
  grid-area: five;
`;
const Six = styled.div`
  grid-area: six;
`;

const TypographyContainer = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-template-rows: 1fr;
  gap: 0px 0px;
  grid-template-areas:
    "typographyOne typographyTwo";
`

const TypographyOne = styled.div`
  grid-area: typographyOne;
`
const TypographyTwo = styled.div`
  grid-area: typographyTwo;
`

const RadioContainer = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-template-rows: 1fr;
  gap: 0px 0px;
  grid-template-areas: 'radioOne radioTwo';
`;

const RadioOne = styled.div`
  grid-area: radioOne;
`;
const RadioTwo = styled.div`
  grid-area: radioTwo;
`;

const ToggleContainer = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-template-rows: 1fr;
  gap: 0px 0px;
  grid-template-areas: 'toggleOne toggleTwo';
`;

const ToggleOne = styled.div`
  grid-area: toggleOne;
`;
const ToggleTwo = styled.div`
  grid-area: toggleTwo;
`;

const FormContainer = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-template-rows: auto 1fr auto;
  gap: 10px 10px;
  grid-template-areas:
    "formOne formOne"
    "formTwo formThree"
    "formFour formFour";
`

const FormThree = styled.div`
  grid-area: formThree;
`
const FormTwo = styled.div`
  grid-area: formTwo;
`
const FormOne = styled.div`
  grid-area: formOne;
`
const FormFour = styled.div`
  grid-area: formFour;
  margin-top: var(--spaceScale-spacing08);
`;

const thema = (theme, path = '') =>
  Object.keys(theme).reduce((acc, key) => {
    if (typeof theme[key] === 'object') {
      acc = [
        ...acc,
        {
          component: componentTypes.FORM_GROUP,
          name: `${[path, key].filter(a => a).join('.')}`,
          labelText: key,
          fields: thema(theme[key], `${[path, key].filter(a => a).join('.')}`),
        },
      ];
    } else {
      acc.push({
        component: componentTypes.INPUT,
        name: `${[path, key].filter(a => a).join('.')}`,
        labelText: key,
        type:
          typeof theme[key] === 'string' &&
          theme[key].match(/^#[0-9A-Fa-f]{6}$/)
            ? 'color'
            : 'text',
        initialValue: theme[key],
      });
    }
    return acc;
  }, []);

export function Example() {
  const [showDrawer, setShowDrawer] = React.useState(false);
  const [theme, setTheme] = React.useState(v3);
  const [activeIndex, setActiveIndex] = React.useState(0);

  function handleChange(index) {
    setActiveIndex(index);
  }

  return (
    <>
      <TabsContainer activeIndex={activeIndex}>
        <Wrapper theme={theme}>
          <Zero>
            <Tabs aria-label="Sample Icon Only Tabs" onChange={handleChange}>
              <Tab aria-label="Preview" icon={<PreviewIcon />} />
              <Tab aria-label="Code" icon={<CodeIcon />} />
              <Tab aria-label="Settings" icon={<SettingsIcon />} />
            </Tabs>
          </Zero>
        </Wrapper>
        <TabPanelsContainer>
          <TabPanel>
            <Container theme={theme}>
              <One>
                <Paragraph style={{ fontWeight: 400, fontSize: '4em' }}>
                  Aa
                </Paragraph>
                <Heading level={6}>Typeface</Heading>
                <TypographyContainer>
                  <TypographyOne>
                    <Paragraph style={{ fontWeight: 300 }}>
                      Typeface / Light
                    </Paragraph>
                    <Paragraph style={{ fontWeight: 400 }}>
                      Typeface / Regular
                    </Paragraph>
                    <Paragraph style={{ fontWeight: 600 }}>
                      Typeface / Semibold
                    </Paragraph>
                    <Paragraph style={{ fontWeight: 700 }}>
                      Typeface / Bold
                    </Paragraph>
                    <Paragraph style={{ fontWeight: 800 }}>
                      Typeface / Extrabold
                    </Paragraph>
                  </TypographyOne>
                  <TypographyTwo>
                    <Heading level={1}>Heading 1</Heading>
                    <Heading level={2}>Heading 2</Heading>
                    <Heading level={3}>Heading 3</Heading>
                    <Heading level={4}>Heading 4</Heading>
                    <Heading level={5}>Heading 5</Heading>
                    <Heading level={6}>Heading 6</Heading>
                  </TypographyTwo>
                </TypographyContainer>
              </One>
              <Two>
                <Paragraph visualStyle={TypographyVisualStyle.bodyLarge}>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                  Maecenas euismod dolor sem, sed consequat eros volutpat at.
                  Pellentesque placerat metus dui, eu egestas enim porta nec.
                </Paragraph>
                <Paragraph visualStyle={TypographyVisualStyle.bodyMedium}>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                  Maecenas euismod dolor sem, sed consequat eros volutpat at.
                  Pellentesque placerat metus dui, eu egestas enim porta nec.
                  Integer varius dui ante, at consequat erat molestie nec. Sed
                  placerat ultricies rutrum.
                </Paragraph>
                <Paragraph visualStyle={TypographyVisualStyle.bodySmall}>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                  Maecenas euismod dolor sem, sed consequat eros volutpat at.
                  Pellentesque placerat metus dui, eu egestas enim porta nec.
                  Integer varius dui ante, at consequat erat molestie nec. Sed
                  placerat ultricies rutrum. Nullam rutrum vulputate metus, eu
                  ullamcorper eros faucibus in.
                </Paragraph>
              </Two>
              <Three>
                <div>
                  <IconButton
                    icon={<AddIcon />}
                    color={ButtonColor.primary}
                    size={ButtonSize.large}
                    iconPosition={ButtonIconPosition.right}
                  >
                    Button Text
                  </IconButton>
                  <IconButton
                    icon={<AddIcon />}
                    color={ButtonColor.primary}
                    iconPosition={ButtonIconPosition.right}
                  >
                    Button Text
                  </IconButton>
                  <IconButton
                    icon={<AddIcon />}
                    color={ButtonColor.primary}
                    size={ButtonSize.small}
                    iconPosition={ButtonIconPosition.right}
                  >
                    Button Text
                  </IconButton>
                </div>
                <div>
                  <IconButton
                    icon={<AddIcon />}
                    color={ButtonColor.secondary}
                    size={ButtonSize.large}
                    iconPosition={ButtonIconPosition.right}
                  >
                    Button Text
                  </IconButton>
                  <IconButton
                    icon={<AddIcon />}
                    color={ButtonColor.secondary}
                    iconPosition={ButtonIconPosition.right}
                  >
                    Button Text
                  </IconButton>
                  <IconButton
                    icon={<AddIcon />}
                    color={ButtonColor.secondary}
                    size={ButtonSize.small}
                    iconPosition={ButtonIconPosition.right}
                  >
                    Button Text
                  </IconButton>
                </div>
                <div>
                  <IconButton
                    icon={<AddIcon />}
                    variant={ButtonVariant.outline}
                    size={ButtonSize.large}
                    iconPosition={ButtonIconPosition.right}
                  >
                    Button Text
                  </IconButton>
                  <IconButton
                    icon={<AddIcon />}
                    variant={ButtonVariant.outline}
                    iconPosition={ButtonIconPosition.right}
                  >
                    Button Text
                  </IconButton>
                  <IconButton
                    icon={<AddIcon />}
                    variant={ButtonVariant.outline}
                    size={ButtonSize.small}
                    iconPosition={ButtonIconPosition.right}
                  >
                    Button Text
                  </IconButton>
                </div>
                <div style={{ backgroundColor: 'var(--colors-foundation02)' }}>
                  <IconButton
                    icon={<AddIcon />}
                    color={ButtonVariant.secondary}
                    size={ButtonSize.large}
                    iconPosition={ButtonIconPosition.right}
                    isInverse
                  >
                    Button Text
                  </IconButton>
                  <IconButton
                    icon={<AddIcon />}
                    color={ButtonVariant.secondary}
                    iconPosition={ButtonIconPosition.right}
                    isInverse
                  >
                    Button Text
                  </IconButton>
                  <IconButton
                    icon={<AddIcon />}
                    color={ButtonVariant.secondary}
                    size={ButtonSize.small}
                    iconPosition={ButtonIconPosition.right}
                    isInverse
                  >
                    Button Text
                  </IconButton>
                </div>
                <div style={{ backgroundColor: 'var(--colors-foundation02)' }}>
                  <IconButton
                    icon={<AddIcon />}
                    variant={ButtonVariant.outline}
                    size={ButtonSize.large}
                    iconPosition={ButtonIconPosition.right}
                    isInverse
                  >
                    Button Text
                  </IconButton>
                  <IconButton
                    icon={<AddIcon />}
                    variant={ButtonVariant.outline}
                    iconPosition={ButtonIconPosition.right}
                    isInverse
                  >
                    Button Text
                  </IconButton>
                  <IconButton
                    icon={<AddIcon />}
                    variant={ButtonVariant.outline}
                    size={ButtonSize.small}
                    iconPosition={ButtonIconPosition.right}
                    isInverse
                  >
                    Button Text
                  </IconButton>
                </div>
              </Three>
              <Four>
                <Card width="250px">
                  <CardBody>
                    <CardHeading>Card Title</CardHeading>
                    <Paragraph color={TypographyColor.subdued}>
                      Secondary Text
                    </Paragraph>
                  </CardBody>
                  <img
                    height="125"
                    width="250"
                    src="https://placekitten.com/250/125"
                  />
                  <CardBody>
                    softer than cotton
                    <br />
                    warm as a hot cup of tea
                    <br />
                    cat purrs beside me
                  </CardBody>
                </Card>
              </Four>
              <Five>
                <Alert isDismissible variant={AlertVariant.info}>
                  Clear and concise message goes here.
                </Alert>
                <Alert isDismissible variant={AlertVariant.success}>
                  Clear and concise message goes here.
                </Alert>
                <Alert isDismissible variant={AlertVariant.warning}>
                  Clear and concise message goes here.
                </Alert>
                <Alert isDismissible variant={AlertVariant.danger}>
                  Clear and concise message goes here.
                </Alert>
                <Accordion defaultIndex={[0]}>
                  <AccordionItem>
                    <h3>
                      <AccordionButton>Section 1</AccordionButton>
                    </h3>
                    <AccordionPanel>
                      Content for section one lorem ipsum
                    </AccordionPanel>
                  </AccordionItem>
                  <AccordionItem>
                    <h3>
                      <AccordionButton>Section 2</AccordionButton>
                    </h3>
                    <AccordionPanel>
                      Content for section two lorem ipsum
                    </AccordionPanel>
                  </AccordionItem>
                  <AccordionItem>
                    <h3>
                      <AccordionButton>Section 3</AccordionButton>
                    </h3>
                    <AccordionPanel>
                      Content for section three lorem ipsum
                    </AccordionPanel>
                  </AccordionItem>
                </Accordion>
              </Five>
              <Six>
                <FormContainer>
                  <FormOne>
                    <TabsContainer activeIndex={1}>
                      <Tabs aria-label="Sample Tabs">
                        <Tab>Tab Label</Tab>
                        <Tab>Tab Label</Tab>
                        <Tab>Tab Label</Tab>
                        <Tab>Tab Label</Tab>
                      </Tabs>
                      <TabPanelsContainer>
                        <TabPanel />
                        <TabPanel />
                        <TabPanel />
                        <TabPanel />
                      </TabPanelsContainer>
                    </TabsContainer>
                  </FormOne>
                  <FormTwo>
                    <Input
                      labelText="Field label"
                      helperMessage="Helper text"
                      placeholder="Placeholder text..."
                    />
                    <DatePicker labelText="Date" />
                    <Select
                      id="basicSelectId"
                      name="select"
                      labelText="Field label"
                      items={[
                        { label: 'Red', value: 'red' },
                        { label: 'Blue', value: 'blue' },
                        { label: 'Green', value: 'green' },
                      ]}
                    />
                    <ProgressBar percentage={50} />
                  </FormTwo>
                  <FormThree>
                    <div style={{ marginTop: '31px' }}>
                      <Search />
                    </div>
                    <RadioContainer>
                      <RadioOne>
                        <Checkbox
                          id="checkbox1"
                          labelText="Option 1"
                          value="1"
                        />
                        <Checkbox
                          id="checkbox2"
                          labelText="Option 2"
                          value="2"
                        />
                        <Checkbox
                          id="checkbox3"
                          labelText="Option 3"
                          value="3"
                        />
                      </RadioOne>
                      <RadioTwo>
                        <RadioGroup>
                          <Radio id="radio1" labelText="Choice 1" value="1" />
                          <Radio id="radio2" labelText="Choice 2" value="2" />
                        </RadioGroup>
                        <ToggleContainer>
                          <ToggleOne>
                            <Toggle />
                          </ToggleOne>
                          <ToggleTwo>
                            <Toggle />
                          </ToggleTwo>
                        </ToggleContainer>
                      </RadioTwo>
                    </RadioContainer>
                  </FormThree>
                  <FormFour>
                    <Tag
                      icon={<AccountCircleIcon />}
                      style={{ marginRight: 'var(--spaceScale-spacing03)' }}
                    >
                      Tag Label
                    </Tag>
                    <Tag
                      icon={<AccountCircleIcon />}
                      style={{ marginRight: 'var(--spaceScale-spacing03)' }}
                      color="primary"
                    >
                      Tag Label
                    </Tag>
                    <Tag
                      icon={<AccountCircleIcon />}
                      style={{ marginRight: 'var(--spaceScale-spacing03)' }}
                      color="lowContrast"
                    >
                      Tag Label
                    </Tag>
                    <Tag
                      icon={<AccountCircleIcon />}
                      style={{ marginRight: 'var(--spaceScale-spacing03)' }}
                      color="highContrast"
                    >
                      Tag Label
                    </Tag>
                  </FormFour>
                </FormContainer>
              </Six>
            </Container>
          </TabPanel>
          <TabPanel>
            <pre>{JSON.stringify(v3, null, 2)}</pre>
          </TabPanel>
          <TabPanel>
            <SchemaRenderer
              schema={{
                title: 'Theme',
                description: 'theme theme theme theme theme',
                type: templateTypes.FORM,
                fields: thema(theme),
              }}
              containerStyle={{ height: '100vh', width: '400px' }}
              initialValues={theme}
              onSubmit={values => {
                setTheme(values)
                setActiveIndex(0)
              }}
            />
          </TabPanel>
        </TabPanelsContainer>
      </TabsContainer>
    </>
  );
}

const Theme = () => (
  <>
    <Example/>
  </>
);

export default Theme;