{
  stdenv,
  nodePackages,
  coreutils-full,
  ...
}:
stdenv.mkDerivation rec {
  name = "ian-mcfarlane-portfolio";
  src = ./.;
  buildInputs = [nodePackages.live-server];
  installPhase = ''
    mkdir -p $out/share/portfolio/
    mkdir -p $out/bin

    # stuff i dont need
    rm *.nix
    rm LICENSE
    rm README.md

    # move data to $out
    mv * $out/share/portfolio/

    echo "live-server $out/share/portfolio/ --entry-file=$out/share/portfolio/index.html" > $out/bin/portfolio
    ${coreutils-full}/bin/chmod +x $out/bin/portfolio
    ln -sf $out/bin/portfolio $out/bin/${name}
  '';
}
