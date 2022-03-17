export class InternalApplicationLayoutViewAnchors {
  static readonly fixed = class {
    static readonly notices = Symbol("App Notices Bar [Fixed]");
    static readonly header = Symbol("App Header Bar [Fixed]");
    static readonly footer = Symbol("App Footer Bar [Fixed]");
    static readonly toolBarHorizontalStart = Symbol(
      "App Horizontal Toolbar [Start][Fixed]"
    );
    static readonly toolBarHorizontalEnd = Symbol(
      "App Horizontal Toolbar [End][Fixed]"
    );
    static readonly toolBarVerticalStart = Symbol(
      "App Vertical Toolbar [Start][Fixed]"
    );
    static readonly toolBarVerticalEnd = Symbol(
      "App Vertical Toolbar [End][Fixed]"
    );
    static readonly menuStart = Symbol("App Menu [Start][Fixed]");
    static readonly menuEnd = Symbol("App Menu [End][Fixed]");
  };

  static readonly scroll = class {
    static readonly notices = Symbol("App Notices Bar [Scroll]");
    static readonly header = Symbol("App Header Bar [Scroll]");
    static readonly footer = Symbol("App Footer Bar [Scroll]");
    static readonly toolBarHorizontalStart = Symbol(
      "App Horizontal Toolbar [Scroll][Start]"
    );
    static readonly toolBarHorizontalEnd = Symbol(
      "App Horizontal Toolbar [Scroll][End]"
    );
    static readonly toolBarVerticalStart = Symbol(
      "App Vertical Toolbar [Scroll][Start]"
    );
    static readonly toolBarVerticalEnd = Symbol(
      "App Vertical Toolbar [Scroll][End]"
    );
    static readonly menuStart = Symbol("App Menu [Scroll][Start]");
    static readonly menuEnd = Symbol("App Menu [Scroll][End]");
  };

  static readonly notices = Symbol("App Notices Bar");
  static readonly header = Symbol("App Header Bar");
  static readonly footer = Symbol("App Footer Bar");
  static readonly toolBarHorizontalStart = Symbol(
    "App Horizontal Toolbar [Start]"
  );
  static readonly toolBarHorizontalEnd = Symbol("App Horizontal Toolbar [End]");
  static readonly toolBarVerticalStart = Symbol("App Vertical Toolbar [Start]");
  static readonly toolBarVerticalEnd = Symbol("App Vertical Toolbar [End]");
  static readonly menuStart = Symbol("App Menu [Start]");
  static readonly menuEnd = Symbol("App Menu [End]");

  static readonly overlay = class {
    static readonly top = Symbol("App Overlay Top");
    static readonly bottom = Symbol("App Overlay Bottom");
    static readonly left = Symbol("App Overlay Left");
    static readonly right = Symbol("App Overlay Right");
  };

  static readonly leftMenuButton = Symbol("App Left Menu Button");
  static readonly rightMenuButton = Symbol("App Right Menu Button");
  static readonly startMenuButton = Symbol("App Start Menu Button");
  static readonly endMenuButton = Symbol("App End Menu Button");


  static readonly headerLogo = Symbol("App Header Logo");
  static readonly headerTitle = Symbol("App Header Title");
  static readonly headerTools = Symbol("App Header Tools");
  static readonly headerToolsSecondary = Symbol("App Header Secondary Tools");


  static readonly mainMenu = Symbol("App Main Menu");
  static readonly secondaryMenu = Symbol("App Secondary Menu");
}
