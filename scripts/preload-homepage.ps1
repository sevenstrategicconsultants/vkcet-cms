param(
  [string]$WebsiteRoot = (Join-Path $PSScriptRoot '..\..\vkcet')
)

$ErrorActionPreference = 'Stop'
$StudioRoot = Resolve-Path (Join-Path $PSScriptRoot '..')
$WebsiteRoot = (Resolve-Path $WebsiteRoot).Path
$ProjectId = 'udbptroj'
$Dataset = 'production'

function Upload-ImageFile([string]$Path, [string]$Alt) {
  if (-not (Test-Path $Path)) { throw "Image not found: $Path" }
  $output = (& npx sanity assets upload --file $Path --type image --dataset $Dataset --project-id $ProjectId 2>&1 | Out-String)
  if ($LASTEXITCODE -ne 0) { throw "Sanity image upload failed for '$Path':`n$output" }
  $match = [regex]::Match($output, 'Uploaded image asset:\s*(image-[a-f0-9]+-\d+x\d+-[a-z0-9]+)')
  if (-not $match.Success) { throw "Could not read uploaded asset ID for '$Path':`n$output" }
  return @{_type = 'image'; alt = $Alt; asset = @{_type = 'reference'; _ref = $match.Groups[1].Value}}
}

function Upload-ImageUrl([string]$Url, [string]$Alt) {
  $output = (& npx sanity assets upload --from-url $Url --type image --dataset $Dataset --project-id $ProjectId 2>&1 | Out-String)
  if ($LASTEXITCODE -ne 0) { throw "Sanity image URL upload failed for '$Url':`n$output" }
  $match = [regex]::Match($output, 'Uploaded image asset:\s*(image-[a-f0-9]+-\d+x\d+-[a-z0-9]+)')
  if (-not $match.Success) { throw "Could not read uploaded asset ID for '$Url':`n$output" }
  return @{_type = 'image'; alt = $Alt; asset = @{_type = 'reference'; _ref = $match.Groups[1].Value}}
}

Push-Location $StudioRoot
try {
  $heroSlides = @()
  for ($i = 1; $i -le 5; $i++) {
    $path = Join-Path $WebsiteRoot "public\vkcet\hero\slide-$i.png"
    $heroSlides += @{_key = "hero-$i"; alt = "VKCET campus hero slide $i"; image = (Upload-ImageFile $path "VKCET campus hero slide $i")}
  }
  $heroSlides += @{_key = 'hero-unsplash-1'; alt = 'Engineering campus'; image = (Upload-ImageUrl 'https://images.unsplash.com/photo-1773829020694-413e879d2957?auto=format&fit=crop&w=1800&q=70' 'Engineering campus')}
  $heroSlides += @{_key = 'hero-unsplash-2'; alt = 'Students on campus'; image = (Upload-ImageUrl 'https://images.unsplash.com/photo-1758270705482-cee87ea98738?auto=format&fit=crop&w=1800&q=70' 'Students on campus')}

  $programs = @(
    @{key='civil'; title='Civil Engineering'; href='/course/civil-engineering'; content='60 Seats'; icon='civil'; image='https://vkcet.com/wp-content/uploads/2024/07/60.jpg'},
    @{key='cse'; title='Computer Science and Engineering'; href='/course/computer-science-engineering'; content='60 Seats'; icon='cse'; image='https://vkcet.com/wp-content/uploads/2024/07/95.jpg'},
    @{key='cyber'; title='Computer Science and Engineering (Cyber Security)'; href='/course/computer-science-engineering-cyber-security'; content='60 Seats'; icon='cyber'; image=$null},
    @{key='eee'; title='Electrical and Electronics Engineering'; href='/course/electrical-electronics-engineering'; content='60 Seats'; icon='eee'; image='https://vkcet.com/wp-content/uploads/2024/07/16.jpg'},
    @{key='ece'; title='Electronics and Communication Engineering'; href='/course/electronics-communication-engineering'; content='60 Seats'; icon='ece'; image='https://vkcet.com/wp-content/uploads/2024/07/54.jpg'},
    @{key='mech'; title='Mechanical Engineering'; href='/course/mechanical-engineering'; content='60 Seats'; icon='mech'; image='https://vkcet.com/wp-content/uploads/2024/07/15.jpg'}
  )
  $programDocuments = @()
  foreach ($program in $programs) {
    $card = @{_key=$program.key; title=$program.title; href=$program.href; content=$program.content; icon=$program.icon; styleClass='style1'}
    if ($program.image) { $card.backgroundImage = Upload-ImageUrl $program.image "$($program.title) program" }
    $programDocuments += $card
  }

  $recruiterNames = @('Wipro','Infosys','TCS','Capgemini','UST','Accenture',"BYJU'S")
  $recruiters = @()
  for ($i = 0; $i -lt $recruiterNames.Count; $i++) {
    $logoNumber = $i + 2
    $path = Join-Path $WebsiteRoot "public\vkcet\placements\logo-$logoNumber.png"
    $recruiters += @{_key="recruiter-$logoNumber"; name=$recruiterNames[$i]; logo=(Upload-ImageFile $path "$($recruiterNames[$i]) logo")}
  }

  $galleryManifest = Get-Content (Join-Path $WebsiteRoot 'src\assets\gallery\manifest.json') -Raw | ConvertFrom-Json
  $lifeCards = @()
  for ($cardIndex = 0; $cardIndex -lt 4; $cardIndex++) {
    $cardImages = @()
    for ($imageIndex = 0; $imageIndex -lt 3; $imageIndex++) {
      $manifestIndex = $cardIndex * 3 + $imageIndex
      $filename = $galleryManifest[$manifestIndex]
      $path = Join-Path $WebsiteRoot "src\assets\gallery\$filename"
      $cardImages += Upload-ImageFile $path "Life at VKCET gallery photo $($manifestIndex + 1)"
    }
    $lifeCards += @{_key="campus-card-$($cardIndex + 1)"; images=$cardImages}
  }

  $homepage = [ordered]@{
    _id='home-page'; _type='homePage'; title='Home Page'
    heroKicker='WELCOME TO VKCET'
    heroTitle='Empowering Future Engineers'
    heroSubtitle="Admissions Open 2026`nJoin a legacy of excellence in education, innovation and leadership."
    ctaLabel='Apply for B.Tech 2026'; ctaLink='admission/how-to-apply'
    heroSlides=$heroSlides; heroIntervalMs=4500; heroAutoplay=$true
    floatingActions=@{
      seatBooking=@{enabled=$true; eyebrow='Admissions'; line1='2026 BTech'; line2='Seat booking'; href='https://docs.google.com/forms/d/e/1FAIpQLScExtUnGDyoRoxJ7Z4iATWwTMQgQKJJC09t8enjq-dMhHufeQ/viewform'}
      socialLinks=@{defaultExpanded=$true; whatsappHref='https://wa.me/'; instagramHref='https://www.instagram.com/vkcetofficial/'; youtubeHref='https://www.youtube.com/@vkcetparippally1559'; linwaysHref='https://vkcet.linways.com'; mapsHref='https://maps.app.goo.gl/f6zNzzW2zWP9C9ys7'}
    }
    programsKicker='Programs'; programsTitle='B.Tech. Programs'; programsViewAllLabel='View All Programs ->'; programsViewAllHref='courses-offered'; programs=$programDocuments
    highlights=@('Learn From The Experts','Book Library & Store','Worldwide Recognize','Best Industry Leaders')
    achievementsTitle='Our Achievements'
    achievements=@(
      @{_key='graduates'; key='graduates'; label='Graduates'; value=3000; suffix='+'},
      @{_key='students'; key='students'; label='Students'; value=1200; suffix='+'},
      @{_key='placement'; key='placement'; label='Placement Rate'; value=95; suffix='%'},
      @{_key='faculty'; key='faculty'; label='Expert Faculty'; value=50; suffix='+'}
    )
    placementsTitle='Placements'; placementRecruiters=$recruiters
    placementStats=@(
      @{_key='highest'; value=([string][char]0x20B9) + ' 10 LPA'; label='Highest Package'},
      @{_key='average'; value=([string][char]0x20B9) + ' 4.2 LPA'; label='Average Package'},
      @{_key='recruiters'; value='200+'; label='Recruiters'}
    )
    placementCtaLabel='View Placement Report'; placementCtaHref='https://vkcet.com/placement-result/'
    lifeAtVkcetTitle='Life at VKCET'; lifeAtVkcetCtaLabel='Explore Campus Life ->'; lifeAtVkcetCtaHref='/student-life-vkcet/gallery'; lifeAtVkcetCards=$lifeCards
  }

  $documents = @($homepage)
  $documents += @(
    @{_id='homepage-event-nss'; _type='event'; title='NSS Event'; summary='Upcoming Event'; image=(Upload-ImageFile (Join-Path $WebsiteRoot 'src\assets\images\events\event-NSS.jpeg') 'NSS event'); isActive=$true},
    @{_id='homepage-event-q2d'; _type='event'; title='Q2D Event'; summary='Upcoming Event'; image=(Upload-ImageFile (Join-Path $WebsiteRoot 'src\assets\images\events\Q2D.jpeg') 'Q2D event'); isActive=$true}
  )

  $testimonialSource = Get-Content (Join-Path $WebsiteRoot 'src\assets\data\testimonial_data.json') -Raw | ConvertFrom-Json
  $defaultPortrait = Upload-ImageFile (Join-Path $WebsiteRoot 'src\assets\images\profile\default.png') 'VKCET testimonial profile'
  foreach ($testimonial in $testimonialSource) {
    $order = [int]$testimonial.id
    $youtube = [string]$testimonial.youtube
    $documents += @{
      _id="homepage-testimonial-$order"; _type='testimonial'; name=$testimonial.name
      designation=$testimonial.designation.Trim(); image=$defaultPortrait
      testimonial=$testimonial.testimonial; order=$order; isActive=$true
    }
    if (-not [string]::IsNullOrWhiteSpace($youtube)) { $documents[-1].youtube = $youtube }
  }

  $ndjson = ($documents | ForEach-Object { ConvertTo-Json -InputObject $_ -Depth 100 -Compress }) -join "`n"
  foreach ($line in $ndjson -split "`n") { $null = $line | ConvertFrom-Json }
  Write-Output "Importing 1 homepage, 2 events, and $($testimonialSource.Count) separate testimonials."
  $ndjson | & npx sanity datasets import - --dataset $Dataset --project-id $ProjectId --missing
  if ($LASTEXITCODE -ne 0) { throw 'Sanity dataset import failed.' }
}
finally {
  Pop-Location
}
