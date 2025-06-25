# cleanup-fonts.ps1
# Script para limpiar fuentes Geist innecesarias

Write-Host "🧹 Limpiando fuentes Geist..." -ForegroundColor Cyan

# Verificar directorio del proyecto
if (-not (Test-Path "package.json")) {
    Write-Host "❌ Error: Ejecuta este script desde la raíz del proyecto" -ForegroundColor Red
    exit 1
}

# Rutas
$geistPath = "public/fonts/Geist/webfonts"
$geistMonoPath = "public/fonts/GeistMono/webfonts"

# Función para calcular tamaño
function Get-FolderSize {
    param([string]$Path)
    if (Test-Path $Path) {
        $size = (Get-ChildItem $Path -Recurse -File | Measure-Object -Property Length -Sum).Sum
        return [math]::Round($size / 1MB, 2)
    }
    return 0
}

# Tamaño inicial
$initialSize = (Get-FolderSize $geistPath) + (Get-FolderSize $geistMonoPath)
Write-Host "📦 Tamaño inicial: $initialSize MB" -ForegroundColor Yellow

# Fuentes a mantener
$geistKeep = @(
    "Geist-Light.woff2",
    "Geist-Regular.woff2", 
    "Geist-Medium.woff2",
    "Geist-SemiBold.woff2",
    "Geist-Bold.woff2"
)

$geistMonoKeep = @(
    "GeistMono-Regular.woff2",
    "GeistMono-Medium.woff2",
    "GeistMono-SemiBold.woff2"
)

# Limpiar Geist Sans
Write-Host "`n🔍 Limpiando Geist Sans..." -ForegroundColor Green
$geistFiles = Get-ChildItem -Path $geistPath -Name "*.woff2" -ErrorAction SilentlyContinue

if ($geistFiles) {
    foreach ($file in $geistFiles) {
        if ($file -notin $geistKeep) {
            $filePath = Join-Path $geistPath $file
            Remove-Item $filePath -Force
            Write-Host "🗑️  Eliminado: $file" -ForegroundColor Red
        } else {
            Write-Host "✅ Mantenido: $file" -ForegroundColor Green
        }
    }
}

# Limpiar Geist Mono
Write-Host "`n🔍 Limpiando Geist Mono..." -ForegroundColor Green
$geistMonoFiles = Get-ChildItem -Path $geistMonoPath -Name "*.woff2" -ErrorAction SilentlyContinue

if ($geistMonoFiles) {
    foreach ($file in $geistMonoFiles) {
        if ($file -notin $geistMonoKeep) {
            $filePath = Join-Path $geistMonoPath $file
            Remove-Item $filePath -Force
            Write-Host "🗑️  Eliminado: $file" -ForegroundColor Red
        } else {
            Write-Host "✅ Mantenido: $file" -ForegroundColor Green
        }
    }
}

# Tamaño final
$finalSize = (Get-FolderSize $geistPath) + (Get-FolderSize $geistMonoPath)
$saved = $initialSize - $finalSize

# Resumen
Write-Host "`n📊 RESUMEN:" -ForegroundColor Cyan
Write-Host "━━━━━━━━━━━━━━━━━━━━━━━━━━" -ForegroundColor Cyan
Write-Host "📦 Tamaño inicial: $initialSize MB" -ForegroundColor White
Write-Host "📦 Tamaño final: $finalSize MB" -ForegroundColor White
Write-Host "💾 Espacio ahorrado: $saved MB" -ForegroundColor Green

# Fuentes mantenidas
Write-Host "`n✅ FUENTES MANTENIDAS:" -ForegroundColor Green
Write-Host "🔤 Geist Sans:" -ForegroundColor Yellow
foreach ($font in $geistKeep) {
    if (Test-Path (Join-Path $geistPath $font)) {
        Write-Host "   • $font" -ForegroundColor White
    }
}

Write-Host "`n🔤 Geist Mono:" -ForegroundColor Yellow
foreach ($font in $geistMonoKeep) {
    if (Test-Path (Join-Path $geistMonoPath $font)) {
        Write-Host "   • $font" -ForegroundColor White
    }
}

Write-Host "`n🎉 Limpieza completada!" -ForegroundColor Green
Write-Host "💡 Ahora actualiza tu CSS para usar las fuentes locales" -ForegroundColor Cyan

Write-Host "`nRuta de ejemplo para CSS:"
Write-Host "url('/fonts/Geist/webfonts/Geist-Regular.woff2')" -ForegroundColor Gray