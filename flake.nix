{
  description = "BMTSU Rzk seminar";

  inputs = {
    nixpkgs.url = "github:nixos/nixpkgs/nixos-unstable";

    utils.url = "github:numtide/flake-utils";

    rzk.url = "github:rzk-lang/rzk";
  };

  outputs = { self, nixpkgs, ... }@inputs: inputs.utils.lib.eachDefaultSystem
    (system:
      let
        pkgs = import nixpkgs {
          inherit system;
        };

      in {
        devShell = pkgs.mkShell {
          buildInputs = with pkgs; [
            inputs.rzk.packages.${system}.default
            tree-sitter
            graphviz
          ];
        };

      });
}

