import React from 'react'
import PropTypes from 'prop-types'
import Helmet from 'react-helmet'
import { StaticQuery, graphql } from 'gatsby'
import { SlidingDrawer } from './sliding-drawer'
import Masthead from './masthead'
import { MDXProvider } from '@mdx-js/tag'
import { Location } from '@reach/router'
import { Transition, config } from 'react-spring'
import {
  Alert,
  Announce,
  AsyncCreatableSelect,
  AsyncSelect,
  CreatableSelect,
  Button,
  Checkbox,
  Heading,
  ICONS,
  Input,
  Label,
  LinkButton,
  Radio,
  RadioGroup,
  Select,
  SkipLink,
  SkipLinkContent,
  Toast,
  Toggle,
  Tooltip,
  amgam,
  amgamDark,
  magma,
  GlobalStyles,
  ThemeContext,
  AddPersonIcon,
  AlertIcon,
  AndroidIcon,
  AngleDownIcon,
  AngleLeftIcon,
  AngleRightIcon,
  AngleUpIcon,
  AppleIcon,
  ArrowDown2Icon,
  ArrowDown3Icon,
  ArrowLeft2Icon,
  ArrowLeft3Icon,
  ArrowRight2Icon,
  ArrowRight3Icon,
  ArrowUp2Icon,
  ArrowUp3Icon,
  ArticleIcon,
  AssignIcon,
  AttachmentIcon,
  BackwardIcon,
  Backward2Icon,
  BankIcon,
  BellIcon,
  BitcoinIcon,
  BlockedIcon,
  Book2Icon,
  BookmarkIcon,
  BubbleIcon,
  Bug2Icon,
  CalendarIcon,
  CancelCircleIcon,
  CaretDownIcon,
  CaretLeftIcon,
  CaretRightIcon,
  CaretUpIcon,
  CartIcon,
  CcAmexIcon,
  CcDiscoverIcon,
  CcMastercardIcon,
  CcPaypalIcon,
  CcStripeIcon,
  CcVisaIcon,
  CheckIcon,
  CircleDownIcon,
  CircleLeftIcon,
  CircleRightIcon,
  CircleUpIcon,
  Clock2Icon,
  ClockIcon,
  Cloud2Icon,
  CnyIcon,
  CodeIcon,
  Cog2Icon,
  CommentsIcon,
  CompassIcon,
  ConnectionIcon,
  CopyIcon,
  CountsTowardsGradeIcon,
  CreditNoCreditIcon,
  CrossIcon,
  CubeIcon,
  DashboardIcon,
  DollarIcon,
  DotCircleOIcon,
  Download2Icon,
  DroppedIcon,
  EllipsisHIcon,
  EllipsisVIcon,
  EnlargeIcon,
  Enlarge2Icon,
  EntypoIcon,
  EnvelopeOIcon,
  EnvelopeIcon,
  ErrorBlackIcon,
  EurIcon,
  ExamIcon,
  ExclamationIcon,
  ExternalLinkIcon,
  Extracredit2Icon,
  EyeSlashIcon,
  Eye2Icon,
  FacebookIcon,
  Feed5Icon,
  FileArchiveOIcon,
  FileAudioOIcon,
  FileCodeOIcon,
  FileExcelOIcon,
  FileImageOIcon,
  FileMovieOIcon,
  FileOIcon,
  FilePdfOIcon,
  FilePowerpointOIcon,
  FileWordOIcon,
  Filter2Icon,
  FirstIcon,
  FlagOIcon,
  Flag3Icon,
  FlashcardsIcon,
  FolderOIcon,
  FolderOpenOIcon,
  ForwardIcon,
  Forward2Icon,
  Forward3Icon,
  GbpIcon,
  GlassdoorIcon,
  GoogleDriveIcon,
  GooglePlusIcon,
  GoogleplayIcon,
  GraduationCapIcon,
  HighlightIcon,
  Home32Icon,
  ImageIcon,
  ImagesIcon,
  InProgressIcon,
  IndentDecreaseIcon,
  IndentIncreaseIcon,
  InfoIcon,
  Info2Icon,
  Info22Icon,
  InrIcon,
  InstagramIcon,
  InteractiveIcon,
  Key3Icon,
  KrwIcon,
  LastIcon,
  LatePenaltyIcon,
  LifebuoyIcon,
  LightningIcon,
  LinkIcon,
  LinkedinIcon,
  ListNumberedIcon,
  ListIcon,
  List2Icon,
  List3Icon,
  LockIcon,
  ManualGradedIcon,
  MapMarkerIcon,
  MarketIcon,
  MenuSteppedIcon,
  MenuIcon,
  Menu2Icon,
  Menu3Icon,
  Menu4Icon,
  MicrophoneSlashIcon,
  MicrophoneIcon,
  MinusCircleIcon,
  MinusIcon,
  MTAct1TimeIcon,
  MTActLearnIcon,
  MTActSerialIcon,
  MtIcon,
  Music2Icon,
  NextIcon,
  Next2Icon,
  NonMindtapActivityIcon,
  NotificationIcon,
  Notification2Icon,
  PaletteIcon,
  ParagraphCenterIcon,
  ParagraphJustifyIcon,
  ParagraphLeftIcon,
  ParagraphRightIcon,
  PauseIcon,
  Pause2Icon,
  Pencil3Icon,
  PhoneHangUpIcon,
  PhoneIcon,
  PieChartIcon,
  PinIcon,
  PinterestIcon,
  Play2Icon,
  Play3Icon,
  PlusIcon,
  PracticeIcon,
  PreviousIcon,
  Previous2Icon,
  PrintIcon,
  ProfileIcon,
  QuestionCircleOIcon,
  QuestionCircleIcon,
  QuestionIcon,
  Question2Icon,
  Reading2Icon,
  RedoIcon,
  Redo2Icon,
  RefreshIcon,
  ReplyIcon,
  RoubleIcon,
  SearchMinusIcon,
  SearchPlusIcon,
  Search2Icon,
  ShrinkIcon,
  Shrink2Icon,
  SignInIcon,
  SnapchatIcon,
  Spinner2Icon,
  SpotifyIcon,
  StackIcon,
  StarFullIcon,
  StarHalfIcon,
  StarIcon,
  StatsBarsIcon,
  StatsBars2Icon,
  StatsDotsIcon,
  StopIcon,
  Stop2Icon,
  SwapHorizIcon,
  TargetIcon,
  ThListIcon,
  ThIcon,
  ThumbsODownIcon,
  ThumbsOUpIcon,
  TimedIcon,
  TimerIcon,
  TrashOIcon,
  TruckIcon,
  TwitterIcon,
  UnarchiveIcon,
  UndoIcon,
  Undo2Icon,
  UnlockIcon,
  UnlockedIcon,
  Upload2Icon,
  VideoCameraIcon,
  VideoIcon,
  VisuallyHidden,
  VolumeDownIcon,
  VolumeOffIcon,
  VolumeUpIcon,
  WarningIcon,
  WidgetsIcon,
  Windows8Icon,
  WlGotItIcon,
  WlLearnItIcon,
  WlPracticeItIcon,
  WlReadyIcon,
  WlUseItIcon,
  WrenchIcon,
  Wrench3Icon,
  YoutubeIcon,
} from 'react-magma-dom'
import DemoComponent from './demo-component'
import { LiveProvider, LiveEditor, LiveError, LivePreview } from 'react-live'
import { convertTextToId } from '../utils'
import iconsArray from '../utils/icons'
import styled from '@emotion/styled'
import './app.css'
import './layout.css'
import './syntax.css'

const PreComponent = ({ className, ...props }) => {
  const hideCode = props.children.props.props.hideCode

  return props.children.props.props &&
    props.children.props.props.className === 'language-.jsx' ? (
    <LiveProvider
      mountStylesheet={false}
      code={props.children.props.children}
      scope={{
        iconsArray,
        Alert,
        Announce,
        AsyncCreatableSelect,
        AsyncSelect,
        CreatableSelect,
        Button,
        Checkbox,
        Heading,
        ICONS,
        Input,
        Label,
        LinkButton,
        Radio,
        RadioGroup,
        Select,
        SkipLink,
        SkipLinkContent,
        Toast,
        Toggle,
        Tooltip,
        magma,
        amgam,
        amgamDark,
        GlobalStyles,
        ThemeContext,
        AddPersonIcon,
        AlertIcon,
        AndroidIcon,
        AngleDownIcon,
        AngleLeftIcon,
        AngleRightIcon,
        AngleUpIcon,
        AppleIcon,
        ArrowDown2Icon,
        ArrowDown3Icon,
        ArrowLeft2Icon,
        ArrowLeft3Icon,
        ArrowRight2Icon,
        ArrowRight3Icon,
        ArrowUp2Icon,
        ArrowUp3Icon,
        ArticleIcon,
        AssignIcon,
        AttachmentIcon,
        BackwardIcon,
        Backward2Icon,
        BankIcon,
        BellIcon,
        BitcoinIcon,
        BlockedIcon,
        Book2Icon,
        BookmarkIcon,
        BubbleIcon,
        Bug2Icon,
        CalendarIcon,
        CancelCircleIcon,
        CaretDownIcon,
        CaretLeftIcon,
        CaretRightIcon,
        CaretUpIcon,
        CartIcon,
        CcAmexIcon,
        CcDiscoverIcon,
        CcMastercardIcon,
        CcPaypalIcon,
        CcStripeIcon,
        CcVisaIcon,
        CheckIcon,
        CircleDownIcon,
        CircleLeftIcon,
        CircleRightIcon,
        CircleUpIcon,
        Clock2Icon,
        ClockIcon,
        Cloud2Icon,
        CnyIcon,
        CodeIcon,
        Cog2Icon,
        CommentsIcon,
        CompassIcon,
        ConnectionIcon,
        CopyIcon,
        CountsTowardsGradeIcon,
        CreditNoCreditIcon,
        CrossIcon,
        CubeIcon,
        DashboardIcon,
        DollarIcon,
        DotCircleOIcon,
        Download2Icon,
        DroppedIcon,
        EllipsisHIcon,
        EllipsisVIcon,
        EnlargeIcon,
        Enlarge2Icon,
        EntypoIcon,
        EnvelopeOIcon,
        EnvelopeIcon,
        ErrorBlackIcon,
        EurIcon,
        ExamIcon,
        ExclamationIcon,
        ExternalLinkIcon,
        Extracredit2Icon,
        EyeSlashIcon,
        Eye2Icon,
        FacebookIcon,
        Feed5Icon,
        FileArchiveOIcon,
        FileAudioOIcon,
        FileCodeOIcon,
        FileExcelOIcon,
        FileImageOIcon,
        FileMovieOIcon,
        FileOIcon,
        FilePdfOIcon,
        FilePowerpointOIcon,
        FileWordOIcon,
        Filter2Icon,
        FirstIcon,
        FlagOIcon,
        Flag3Icon,
        FlashcardsIcon,
        FolderOIcon,
        FolderOpenOIcon,
        ForwardIcon,
        Forward2Icon,
        Forward3Icon,
        GbpIcon,
        GlassdoorIcon,
        GoogleDriveIcon,
        GooglePlusIcon,
        GoogleplayIcon,
        GraduationCapIcon,
        HighlightIcon,
        Home32Icon,
        ImageIcon,
        ImagesIcon,
        InProgressIcon,
        IndentDecreaseIcon,
        IndentIncreaseIcon,
        InfoIcon,
        Info2Icon,
        Info22Icon,
        InrIcon,
        InstagramIcon,
        InteractiveIcon,
        Key3Icon,
        KrwIcon,
        LastIcon,
        LatePenaltyIcon,
        LifebuoyIcon,
        LightningIcon,
        LinkIcon,
        LinkedinIcon,
        ListNumberedIcon,
        ListIcon,
        List2Icon,
        List3Icon,
        LockIcon,
        ManualGradedIcon,
        MapMarkerIcon,
        MarketIcon,
        MenuSteppedIcon,
        MenuIcon,
        Menu2Icon,
        Menu3Icon,
        Menu4Icon,
        MicrophoneSlashIcon,
        MicrophoneIcon,
        MinusCircleIcon,
        MinusIcon,
        MTAct1TimeIcon,
        MTActLearnIcon,
        MTActSerialIcon,
        MtIcon,
        Music2Icon,
        NextIcon,
        Next2Icon,
        NonMindtapActivityIcon,
        NotificationIcon,
        Notification2Icon,
        PaletteIcon,
        ParagraphCenterIcon,
        ParagraphJustifyIcon,
        ParagraphLeftIcon,
        ParagraphRightIcon,
        PauseIcon,
        Pause2Icon,
        Pencil3Icon,
        PhoneHangUpIcon,
        PhoneIcon,
        PieChartIcon,
        PinIcon,
        PinterestIcon,
        Play2Icon,
        Play3Icon,
        PlusIcon,
        PracticeIcon,
        PreviousIcon,
        Previous2Icon,
        PrintIcon,
        ProfileIcon,
        QuestionCircleOIcon,
        QuestionCircleIcon,
        QuestionIcon,
        Question2Icon,
        Reading2Icon,
        RedoIcon,
        Redo2Icon,
        RefreshIcon,
        ReplyIcon,
        RoubleIcon,
        SearchMinusIcon,
        SearchPlusIcon,
        Search2Icon,
        ShrinkIcon,
        Shrink2Icon,
        SignInIcon,
        SnapchatIcon,
        Spinner2Icon,
        SpotifyIcon,
        StackIcon,
        StarFullIcon,
        StarHalfIcon,
        StarIcon,
        StatsBarsIcon,
        StatsBars2Icon,
        StatsDotsIcon,
        StopIcon,
        Stop2Icon,
        SwapHorizIcon,
        TargetIcon,
        ThListIcon,
        ThIcon,
        ThumbsODownIcon,
        ThumbsOUpIcon,
        TimedIcon,
        TimerIcon,
        TrashOIcon,
        TruckIcon,
        TwitterIcon,
        UnarchiveIcon,
        UndoIcon,
        Undo2Icon,
        UnlockIcon,
        UnlockedIcon,
        Upload2Icon,
        VideoCameraIcon,
        VideoIcon,
        VolumeDownIcon,
        VolumeOffIcon,
        VolumeUpIcon,
        WarningIcon,
        WidgetsIcon,
        Windows8Icon,
        WlGotItIcon,
        WlLearnItIcon,
        WlPracticeItIcon,
        WlReadyIcon,
        WlUseItIcon,
        WrenchIcon,
        Wrench3Icon,
        YoutubeIcon,
        DemoComponent,
        VisuallyHidden,
      }}
    >
      <div
        className="pre-container"
        style={hideCode ? { display: 'none' } : null}
      >
        <LiveEditor tabIndex="-1" />
      </div>
      <LiveError />
      <LivePreview />
    </LiveProvider>
  ) : (
    <pre {...props} />
  )
}

const StyledSkipLink = styled(SkipLink)`
  display: none;

  &:not(:disabled):focus {
    background: transparent;
  }

  @media (min-width: 1024px) {
    display: inline-flex;
  }
`

const Table = props => (
  <div style={{ margin: '10px 0' }}>
    <table {...props} />
  </div>
)

const SectionHeading = props => (
  <h2 id={convertTextToId(props.children)}>{props.children}</h2>
)

const LinkHeading = props => (
  <h3 id={convertTextToId(props.children)}>{props.children}</h3>
)

const Layout = ({ children }) => (
  <StaticQuery
    query={graphql`
      query SiteTitleQuery {
        site {
          siteMetadata {
            title
          }
        }
      }
    `}
    render={data => (
      <>
        <GlobalStyles />
        <Helmet
          title={data.site.siteMetadata.title}
          meta={[
            { name: 'description', content: 'Sample' },
            { name: 'keywords', content: 'sample, something' },
          ]}
        >
          <html lang="en" />
        </Helmet>
        <StyledSkipLink
          inverse
          positionLeft={275}
          positionTop={16}
          variant="outline"
        />
        <main className="main">
          <SlidingDrawer />
          <Masthead />
          <section className="content">
            <MDXProvider
              components={{
                pre: PreComponent,
                table: Table,
                h2: SectionHeading,
                h3: LinkHeading,
              }}
            >
              <Location>
                {({ location }) => (
                  <Transition
                    config={config.slow}
                    keys={location.pathname}
                    from={{ opacity: 0 }}
                    enter={{ opacity: 1 }}
                    leave={{ opacity: 0 }}
                  >
                    {() => style => (
                      <article className="content-article" style={style}>
                        <SkipLinkContent>{children}</SkipLinkContent>
                      </article>
                    )}
                  </Transition>
                )}
              </Location>
            </MDXProvider>
          </section>
        </main>
      </>
    )}
  />
)

Layout.propTypes = {
  children: PropTypes.node.isRequired,
}

export default Layout
