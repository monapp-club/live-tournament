#!/bin/sh

# Generate QR Codes for the given list of URLs
# 1. Read hdm-am.txt file and grep every line that contains "tinyurl.com/edr-hdm"
# 2. Generate QR Code for each URL
# 3. Save QR Code as PNG file

echo "Hello, which day part do you want to generate QR Codes for?"
read day_part

# 1. Read hdm-am.txt file and grep every line that contains "tinyurl.com/edr-hdm"
links=`cat hdm-$day_part.txt | grep "tinyurl.com/edr-hdm"`
# Read hdm-am.txt file and grep every line that contains "Title "
titles=`cat hdm-$day_part.txt | grep "Title "`
# Convert titles to array by breakline
IFS=$'\n' titles_arr=($titles)

# 2. Generate QR Code for each URL and save it as PNG file with index
index=1
for link in $links
do
  title="${titles_arr[index]}"
  # Increment index
  index=$((index+1))
  # Extract category from title ("Title U10 B | Poule 1 | Terrain Hiquet Jaune" > "U10B")
  category=`echo $title | cut -d " " -f 2-3 | sed 's/ //g'`
  # Extract pool from title ("Title U10 B | Poule 1 | Terrain Hiquet Jaune" > "Poule 1")
  pool=`echo $title | cut -d " " -f 5-6 | sed 's/ //g'`
  # Extract field from title ("Title U10 B | Poule 1 | Terrain Hiquet Jaune" > "Terrain Hiquet Jaune")
  field=`echo $title | cut -d " " -f 8- | sed 's/ //g'`
  # Check if field, or pool, or category is empty
  if [ -z "$field" ]
  then
    break;
  fi
  if [ -z "$pool" ]
  then
    break;
  fi
  if [ -z "$category" ]
  then
    break;
  fi
  # # Create filename
  filename="$category-$pool-$field-$day_part.png"
  # Create directory for QR Codes
  mkdir -p "qrcodes/$day_part"
  # Generate QR Code for URL
  echo "Generating QR Code $filename"
  qrencode -o "qrcodes/$day_part/$filename" $link
done

# 3. Save QR Code as PNG file
echo "Done!"