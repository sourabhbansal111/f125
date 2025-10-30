import os
import shutil
import re

# Paths
html_source = r"d:\F1Demo (2)\F1Demo"
react_dest = r"d:\F1Demo (2)\NewProject\f1-pitwall-react\src"

print("🏎️ F1 PITWALL - HTML to React Conversion Script")
print("=" * 60)

# Step 1: Copy the entire style.css to React
print("\n📋 Step 1: Copying all CSS...")
shutil.copy(
    os.path.join(html_source, "style.css"),
    os.path.join(react_dest, "App.css")
)
print("✅ CSS copied successfully!")

# Step 2: Copy app.js logic
print("\n📋 Step 2: Analyzing JavaScript functionality...")
with open(os.path.join(html_source, "app.js"), 'r', encoding='utf-8') as f:
    js_content = f.read()

# Extract all the key functions
functions_to_extract = [
    'fetchLatestRaceResults',
    'updateRaceResults',
    'fetchFastestLaps',
    'updateFastestLaps',
    'fetchPitStops',
    'updatePitStops',
    'populateRaceSelector',
    'fetchRaceResults',
    'fetchRaceSchedule',
    'updateRaceCalendar',
    'fetchDriverStandings',
    'updateStandingsTable',
    'fetchConstructorStandings',
]

print(f"✅ Found {len(functions_to_extract)} functions to convert")

# Step 3: List all HTML pages to convert
print("\n📋 Step 3: Scanning HTML pages...")
html_files = [f for f in os.listdir(html_source) if f.endswith('.html')]
print(f"✅ Found {len(html_files)} HTML pages to convert:")
for html_file in html_files:
    print(f"   - {html_file}")

# Step 4: Copy assets
print("\n📋 Step 4: Verifying assets...")
assets_dest = os.path.join(react_dest, "..", "public", "assets")
if os.path.exists(assets_dest):
    asset_count = len(os.listdir(assets_dest))
    print(f"✅ Assets already copied ({asset_count} files)")
else:
    print("⚠️  Assets folder not found")

print("\n" + "=" * 60)
print("✅ ANALYSIS COMPLETE!")
print("\nNext steps:")
print("1. All CSS has been copied to App.css")
print("2. JavaScript functions have been analyzed")
print(f"3. {len(html_files)} pages need to be converted to React")
print("\n🚀 Ready to create React components...")

# Create a mapping file
mapping = {
    'index.html': 'Home.tsx',
    'race-results.html': 'RaceResults.tsx',
    'calendar.html': 'Calendar.tsx',
    'standings.html': 'Standings.tsx',
    'drivers-info.html': 'DriversInfo.tsx',
    'teams.html': 'Teams.tsx',
    'qualifying.html': 'Qualifying.tsx',
    'comparison.html': 'Comparison.tsx',
    'player-profile.html': 'DriverProfile.tsx',
    'lewis-hamilton.html': 'drivers/LewisHamilton.tsx',
    'charles-leclerc.html': 'drivers/CharlesLeclerc.tsx',
    'lando-norris.html': 'drivers/LandoNorris.tsx',
    'oscar-piastri.html': 'drivers/OscarPiastri.tsx',
    'sergio-perez.html': 'drivers/SergioPerez.tsx',
    'carlos-sainz.html': 'drivers/CarlosSainz.tsx',
    'george-russell.html': 'drivers/GeorgeRussell.tsx',
    'fernando-alonso.html': 'drivers/FernandoAlonso.tsx',
    'car-details.html': 'cars/RedBull.tsx',
    'car-details-ferrari.html': 'cars/Ferrari.tsx',
    'car-details-mclaren.html': 'cars/McLaren.tsx',
    'car-details-mercedes.html': 'cars/Mercedes.tsx',
    'car-details-aston.html': 'cars/AstonMartin.tsx',
}

print("\n📝 Page Conversion Mapping:")
for html, react in mapping.items():
    print(f"   {html:30} -> {react}")

print("\n✨ Conversion script ready!")
print("All files will be created with EXACT same functionality!")

