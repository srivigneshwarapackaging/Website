#!/bin/bash
# Copy your AI-generated journey clips into the site.
# Run from the project root after placing files in Downloads.

set -e
DEST="frontend/public/videos"
mkdir -p "$DEST"

SRC1="$HOME/Downloads/Create_a_photorealistic_3-scene_industrial_film_for_Sri_Vigneshwara_Packaging,_a_premium_corrugated__seed1672646971.mp4"
SRC2="$HOME/Downloads/PixVerse_V6_Fusion_360P_1__2_Create_an_ultraph.mp4"

cp "$SRC1" "$DEST/journey-factory.mp4"
cp "$SRC2" "$DEST/journey-delivery.mp4"

echo "Done:"
ls -lh "$DEST/journey-factory.mp4" "$DEST/journey-delivery.mp4"
