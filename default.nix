{
  stdenv,
  nodePackages,
  coreutils-full,
  minify,
  ...
}:
stdenv.mkDerivation rec {
  name = "ian-mcfarlane-portfolio";
  src = ./.;
  buildInputs = [nodePackages.live-server];

  dontUnpack = true;

  buildPhase = ''
    for file in $src/*; do
      ${minify}/bin/minify --sync --recursive --verbose --match ".\.(html|css|js|json|svg)" --output . $file
    done
  '';

  installPhase = ''
    # stuff i dont need
    ls -al
    rm *.nix
    rm LICENSE
    rm README.md

    mkdir -p $out/share/portfolio/
    mkdir -p $out/bin

    # move data to $out
    mv * $out/share/portfolio/

    echo "live-server $out/share/portfolio/ --entry-file=$out/share/portfolio/index.html" > $out/bin/portfolio
    ${coreutils-full}/bin/chmod +x $out/bin/portfolio
    ln -sf $out/bin/portfolio $out/bin/${name}
  '';
}
