# RENAME NEW BLOCK TEXTS

sed -i "s/domki-galleries/domki-gallery/g"
sed -i "s/BLOCK*STARTER/BLOCK_ADVERTS/g" *
sed -i "s/SHORT_DESCRIPTION/SHORT_DESCRIPTION_ADVERTS/g"

sed -i -e 's/domki-footer/domki-header/g' -e 's/BLOCK_FOOTER/BLOCK_HEADER/g' -e 's/SHORT_DESCRIPTION_FOOTER/SHORT_DESCRIPTION_Header/g' \*
