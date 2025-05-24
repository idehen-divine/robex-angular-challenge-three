{ pkgs, ... }: {
  channel = "stable-24.05";
  # extensions = [
  #   "angular.ng-template"
  #   "dbaeumer.vscode-eslint"
  #   "sourcegraph.cody-ai"
  #   "usernamehw.errorlens"
  #   "ionic.ionic"
  # ];
  
  packages = [
    pkgs.nodejs_18       # Compatible with Angular/Capacitor
    pkgs.yarn
    pkgs.jdk17           # Required for Android builds
    pkgs.gradle          # Required for Android project
    pkgs.unzip
    pkgs.android-tools   # adb, emulator, sdkmanager, etc.
    pkgs.nano
  ];
  env = {
    JAVA_HOME = "${pkgs.jdk17}/lib/openjdk";
    ANDROID_SDK_ROOT = "/home/user/.androidsdkroot";
  };
  idx = {
    previews = {
      enable = true;
      previews = {
        # web = {
        #   command = [
        #     "yarn" "run" "start"
        #     "--"
        #     "--port" "$PORT"
        #     "--host" "0.0.0.0"
        #   ];
        #   manager = "web";
        # };
        android = {
          command = [
            "yarn"
            "run"
            "android"
          ];
          manager = "android";
        };
      };
    };

    workspace = {
      # Auto-setup project on first create (optional)
      onCreate = {
        install = ''
          yarn
          npx cap sync
        '';
      };
    };
  };
}
