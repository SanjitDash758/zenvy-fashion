$consumerKey = "ck_18af348e3e2b12cb89d3d8362d76332d85faa261"
$consumerSecret = "cs_8f7c6736770019dc92fc0df4e94ae400e16683b3"

$method = "GET"
$url = "http://localhost:8080/wp-json/wc/v3/products/213"

$timestamp = [DateTimeOffset]::UtcNow.ToUnixTimeSeconds().ToString()
$nonce = [Guid]::NewGuid().ToString("N")

function Encode([string]$value) {
    return [Uri]::EscapeDataString($value)
}

$params = @(
    "oauth_consumer_key=" + (Encode $consumerKey)
    "oauth_nonce=" + (Encode $nonce)
    "oauth_signature_method=HMAC-SHA1"
    "oauth_timestamp=" + (Encode $timestamp)
    "oauth_version=1.0"
)

$parameterString = ($params | Sort-Object) -join "&"

$baseString = `
    (Encode $method) + "&" + `
    (Encode $url) + "&" + `
    (Encode $parameterString)

$signingKey = (Encode $consumerSecret) + "&"

$hmac = New-Object System.Security.Cryptography.HMACSHA1
$hmac.Key = [Text.Encoding]::ASCII.GetBytes($signingKey)

$hash = $hmac.ComputeHash(
    [Text.Encoding]::ASCII.GetBytes($baseString)
)

$signature = [Convert]::ToBase64String($hash)

$authHeader = `
    'OAuth ' +
    'oauth_consumer_key="' + (Encode $consumerKey) + '",' +
    'oauth_nonce="' + (Encode $nonce) + '",' +
    'oauth_signature_method="HMAC-SHA1",' +
    'oauth_timestamp="' + $timestamp + '",' +
    'oauth_version="1.0",' +
    'oauth_signature="' + (Encode $signature) + '"'

Write-Host "`nRequesting WooCommerce API...`n"

curl.exe -i `
    -H "Authorization: $authHeader" `
    "$url"
