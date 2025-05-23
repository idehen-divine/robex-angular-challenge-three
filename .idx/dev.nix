{pkgs}: {
  channel = "stable-24.05";
  packages = [
    pkgs.nodejs_2
    pkgs.yarn 
    pkgs.nano
  ];
  idx.extensions = [
    "angular.ng-template"
    "dbaeumer.vscode-eslint"
    "sourcegraph.cody-ai"
    "usernamehw.errorlens"
  ];
  idx.previews = {
    previews = {
      web = {
        command = [
          "yarn"
          "run"
          "start"
          "--"
          "--port"
          "$PORT"
          "--host"
          "0.0.0.0"
          "--disable-host-check"
        ];
        manager = "web";
      };
    };
  };
}