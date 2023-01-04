{
  description = "simple shell environment";
  inputs = {
    nixpkgs.url = github:nixos/nixpkgs?rev=16f4e04658c2ab10114545af2f39db17d51bd1bd;
  };

  outputs = {
    self,
    nixpkgs,
  } @ inputs: let
    supportedSystems = [
      "x86_64-linux"
      "aarch64-linux"
    ];
    genSystems = nixpkgs.lib.genAttrs supportedSystems;
    pkgs = genSystems (system: import nixpkgs {inherit system;});

    # not these though
    stateVersion = "22.11";
  in {
    packages = genSystems (system: rec {
      portfolio = pkgs.${system}.callPackage ./. {};
      default = portfolio;
    });
    devShell = genSystems (system:
      pkgs.${system}.mkShell {
        packages = with pkgs.${system}; [
          nodejs
          nodePackages.live-server
        ];
      });
  };
}
