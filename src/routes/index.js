// Import pages.
import MessageListingPage from "../pages/Messages";
import QuestionsListingPage from "../pages/Questions";
import LoginPage from "../pages/Login";
// import JobListingPage from "../pages/Jobs";
// import JobPostPage from "../pages/Jobs/JobPost";
// import ProfilePageDetail from "../pages/Profile/ProfilePage";
// import Profiles from "../pages/Profile";
import AdministrationPage from "../pages/Administration";
import Homepage from "../pages/Homepage";
// import ScholarshipsListingPage from "../pages/Scholarships";
// import ScholarshipPage from "../pages/Scholarships/Scholarship";
// import GroupsListingPage from "../pages/Groups";
// import GroupDetailPage from "../pages/Groups/GroupsPage";

export default [
  {
    path: "/",
    to: "/",
    name: "Home",
    icon: "home",
    exact: true,
    hasMenu: false,
    restrictedRoute: true,
    enabled: true,
    component: Homepage,
  },
  {
    path: "/home",
    to: "/home",
    name: "Home",
    icon: "home",
    exact: true,
    hasMenu: true,
    restrictedRoute: false,
    enabled: true,
    component: Homepage,
  },
  // {
  //   path: "/administration/:tab?",
  //   to: "/administration",
  //   name: "Administration",
  //   icon: "administration",
  //   exact: true,
  //   hasMenu: true,
  //   restrictedRoute: true,
  //   enabled: true,
  //   component: AdministrationPage,
  // },
  // {
  //   path: "/scholarships",
  //   to: "/scholarships",
  //   name: "Scholarships",
  //   icon: "scholarship",
  //   exact: true,
  //   hasMenu: true,
  //   restrictedRoute: false,
  //   enabled: true,
  //   component: ScholarshipsListingPage
  // },
  // {
  //   path: "/scholarship/:postId",
  //   to: "/scholarship/:postId",
  //   name: "Scholarship",
  //   icon: "scholarship",
  //   exact: true,
  //   hasMenu: false,
  //   restrictedRoute: false,
  //   enabled: true,
  //   component: ScholarshipPage
  // },
  // {
  //   path: "/job-posts",
  //   to: "/job-posts",
  //   name: "Job Posts",
  //   icon: "job",
  //   exact: true,
  //   hasMenu: true,
  //   restrictedRoute: false,
  //   enabled: true,
  //   component: JobListingPage
  // },
  {
    path: "/questions",
    to: "/questions",
    name: "Questions",
    icon: "question",
    exact: true,
    hasMenu: true,
    restrictedRoute: true,
    enabled: true,
    component: QuestionsListingPage,
  },
  {
    path: "/messages",
    to: "/messages",
    name: "Messages",
    icon: "message",
    exact: true,
    hasMenu: true,
    restrictedRoute: true,
    enabled: true,
    component: MessageListingPage,
  },
  // {
  //   path: "/profiles",
  //   to: "/profiles",
  //   name: "Faculty",
  //   icon: "faculty",
  //   exact: true,
  //   hasMenu: true,
  //   restrictedRoute: false,
  //   enabled: true,
  //   component: Profiles
  // },
  // {
  //   path: "/profile/:uid",
  //   to: "/profile/:uid",
  //   name: "Faculty",
  //   icon: "faculty",
  //   exact: true,
  //   hasMenu: false,
  //   restrictedRoute: false,
  //   enabled: true,
  //   component: ProfilePageDetail
  // },
  // {
  //   path: "/students",
  //   to: "/students",
  //   name: "Students",
  //   icon: "student",
  //   exact: true,
  //   hasMenu: true,
  //   restrictedRoute: false,
  //   enabled: true,
  //   component: Profiles
  // },
  // {
  //   path: "/alumni",
  //   to: "/alumni",
  //   name: "Alumni",
  //   icon: "alumni",
  //   exact: true,
  //   hasMenu: true,
  //   restrictedRoute: false,
  //   enabled: true,
  //   component: Profiles
  // },
  // {
  //   path: "/groups",
  //   to: "/groups",
  //   name: "Groups",
  //   icon: "group",
  //   exact: true,
  //   hasMenu: true,
  //   restrictedRoute: false,
  //   enabled: true,
  //   component: GroupsListingPage
  // },
  // {
  //   path: "/group/:groupId",
  //   to: "/group/:groupId",
  //   name: "Groups",
  //   icon: "group",
  //   exact: true,
  //   hasMenu: false,
  //   restrictedRoute: false,
  //   enabled: true,
  //   component: GroupDetailPage
  // },
  {
    path: "/login",
    to: "/login",
    name: "Login",
    icon: "login",
    exact: true,
    hasMenu: true,
    restrictedRoute: false,
    enabled: true,
    component: LoginPage,
  },
  //   {
  //     path: "/forgot-password",
  //     to: "/forgot-password",
  //     name: "Forgot password",
  //     exact: true,
  //     hasMenu: false,
  //     restrictedRoute: false,
  //     enabled: true,
  //     component: ForgotPasswordPage
  //   },
  //   {
  //     path: "/reset-password",
  //     to: "/reset-password",
  //     name: "ForgoReset password",
  //     exact: true,
  //     hasMenu: false,
  //     restrictedRoute: false,
  //     enabled: true,
  //     component: ResetPasswordPage
  //   }
];
