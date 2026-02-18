#!/bin/bash

LANGS=("fr" "it" "de" "es" "pt" "ja" "id" "zh" "ar" "vi" "tr" "pl" "nl" "sv" "da" "no" "fi" "cs" "he" "en" "ko")

for lang in "${LANGS[@]}"; do
  npm run write-translations --locale "$lang"
done