$ErrorActionPreference = "Stop"

$repoRoot = Split-Path -Parent $PSScriptRoot
$outputDir = Join-Path $repoRoot "screenshots"
New-Item -ItemType Directory -Force -Path $outputDir | Out-Null

foreach ($existingFile in Get-ChildItem -Path $outputDir -Filter "*.png" -ErrorAction SilentlyContinue) {
  Remove-Item $existingFile.FullName -Force
}

Add-Type -AssemblyName System.Drawing

function New-ScenarioImage {
  param(
    [string]$Path,
    [string]$Title,
    [string]$Subtitle,
    [string[]]$Bullets
  )

  $width = 1600
  $height = 900
  $bitmap = New-Object System.Drawing.Bitmap $width, $height
  $graphics = [System.Drawing.Graphics]::FromImage($bitmap)
  $graphics.SmoothingMode = [System.Drawing.Drawing2D.SmoothingMode]::AntiAlias
  $graphics.Clear([System.Drawing.Color]::FromArgb(7, 17, 29))

  $bgBrush = New-Object System.Drawing.SolidBrush ([System.Drawing.Color]::FromArgb(13, 26, 43))
  $panelPen = New-Object System.Drawing.Pen ([System.Drawing.Color]::FromArgb(103, 224, 190), 2)
  $titleBrush = New-Object System.Drawing.SolidBrush ([System.Drawing.Color]::FromArgb(237, 242, 255))
  $bodyBrush = New-Object System.Drawing.SolidBrush ([System.Drawing.Color]::FromArgb(159, 176, 207))
  $accentBrush = New-Object System.Drawing.SolidBrush ([System.Drawing.Color]::FromArgb(103, 224, 190))

  $fontTitle = New-Object System.Drawing.Font("Georgia", 40, [System.Drawing.FontStyle]::Bold)
  $fontSub = New-Object System.Drawing.Font("Segoe UI", 16, [System.Drawing.FontStyle]::Regular)
  $fontBody = New-Object System.Drawing.Font("Segoe UI", 26, [System.Drawing.FontStyle]::Regular)
  $fontFooter = New-Object System.Drawing.Font("Segoe UI", 18, [System.Drawing.FontStyle]::Regular)

  $rect = New-Object System.Drawing.Rectangle 20, 20, 1560, 820
  $graphics.FillRectangle($bgBrush, $rect)
  $graphics.DrawRectangle($panelPen, $rect)

  $graphics.DrawString("Board Decision Resolution Confidence Scorecard", $fontSub, $accentBrush, 70, 85)
  $graphics.DrawString($Title, $fontTitle, $titleBrush, 70, 150)
  $graphics.DrawString($Subtitle, $fontBody, $bodyBrush, (New-Object System.Drawing.RectangleF(70, 240, 1380, 110)))

  $y = 360
  foreach ($bullet in $Bullets) {
    $graphics.FillEllipse($accentBrush, 85, $y + 13, 12, 12)
    $graphics.DrawString($bullet, $fontBody, $titleBrush, 110, $y)
    $y += 84
  }

  $graphics.DrawString("Synthetic proof render for README packaging.", $fontFooter, $bodyBrush, 70, 770)
  $bitmap.Save($Path, [System.Drawing.Imaging.ImageFormat]::Png)

  $graphics.Dispose()
  $bitmap.Dispose()
}

New-ScenarioImage -Path (Join-Path $outputDir "01-overview-proof.png") -Title "Board-facing decision confidence stays visible before another approved packet quietly reopens" -Subtitle "This surface turns thin proof, sponsor drift, unclear execution, reversal pressure, and stale decision packets into one board-readable confidence map." -Bullets @(
  "Which decisions are only partially settled because proof, alignment, or execution clarity are still too thin.",
  "Where reversal pressure is already building even though the packet looks approved on paper.",
  "What should be strengthened, narrowed, reset, or escalated before the next board or investor review."
)

New-ScenarioImage -Path (Join-Path $outputDir "02-confidence-register-proof.png") -Title "Confidence register keeps each decision, owner, audience, and next move attached" -Subtitle "Every lane retains the confidence tier, operating story, accountable owner, and immediate corrective step." -Bullets @(
  "Each decision stays tied to one owner and one board-facing audience.",
  "Confidence weakness is visible before it turns into another vague status update.",
  "The next corrective move sits next to the lane instead of disappearing into a separate memo."
)

New-ScenarioImage -Path (Join-Path $outputDir "03-resolution-tiers-proof.png") -Title "Resolution tiers show whether evidence, sponsor alignment, execution clarity, or reversal pressure are driving the instability" -Subtitle "The dominant decision-quality weakness remains visible so leadership can fix the right problem first." -Bullets @(
  "The blocking issue is explicit instead of implied.",
  "Evidence, alignment, clarity, reversal pressure, and decision age stay readable at a glance.",
  "Each lane ties to a concrete corrective move instead of a generic board-process complaint."
)

New-ScenarioImage -Path (Join-Path $outputDir "04-confidence-posture-proof.png") -Title "Confidence posture keeps decision-quality interventions grounded in owners and value at stake" -Subtitle "Composite risk score, value at stake, and next moves stay grounded in the same operating view." -Bullets @(
  "Strengthen evidence, align sponsors, narrow scope, reset the path, and contain reversal pressure stay tied to one owner.",
  "Value at stake is visible before the next review cycle.",
  "Boards and operators can see which confidence intervention should move first."
)
