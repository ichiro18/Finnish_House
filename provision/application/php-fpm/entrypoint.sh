#!/usr/bin/env bash
set -e

# Env variables
ERRORS=0

echo "### STEP: 1/4 -- Check env variables"

if [[ -z ${MYSQL_DATABASE} ]]; then
  echo "ERROR: Missing MYSQL_DATABASE env variable"
  ERRORS=$((ERRORS + 1))
fi

if [[ -z ${MYSQL_USER} ]]; then
  echo "ERROR: Missing MYSQL_USER env variable"
  ERRORS=$((ERRORS + 1))
fi

if [[ -z ${MYSQL_PASSWORD} ]]; then
  echo "ERROR: Missing MYSQL_PASSWORD env variable"
  ERRORS=$((ERRORS + 1))
fi

if [[ -z ${MYSQL_HOST} ]]; then
  echo "ERROR: Missing MYSQL_HOST env variable"
  ERRORS=$((ERRORS + 1))
fi

if [[ -z ${MYSQL_PORT} ]]; then
  echo "ERROR: Missing MYSQL_PORT env variable"
  ERRORS=$((ERRORS + 1))
fi

if [[ ${ERRORS} > 0 ]]; then
    echo "DANGER: There are ${ERRORS} errors. See the console above. Exiting..."
    exit 1
fi
echo "### Ok"

# Check connect to Database
echo "### STEP: 2 -- Check connect to Database"
database_ready(){
TERM=dumb php -- <<'EOPHP'
<?php
$host = getenv("MYSQL_HOST");
$port = getenv("MYSQL_PORT");
$dbName = getenv("MYSQL_DATABASE");
$dbUser = getenv("MYSQL_USER");
$pass = getenv("MYSQL_PASSWORD");

$mysql = new mysqli($host, $dbUser, $pass, $dbName, $port);
if ($mysql->connect_error) {
    $mysql->close();
    exit(1);
}
$mysql->close();
exit(0);
EOPHP
}

until database_ready; do
  >&2 echo 'Waiting for connecting database...'
  sleep 3
done
echo "### Ok"

# check files (install, htaccess)
echo "### STEP: 3 -- Check install"
if [[ ! -e "$PWD/app/wp/wp-includes/version.php" ]]; then
  echo "WARNING: WordPress not found in $PWD/app - install now..."

  composer install

  echo "SUCCESS: Complete! WordPress has been successfully installed to $PWD/app"
fi
if [[ ! -e "$PWD/app/.htaccess" ]]; then
  echo "WARNING: Missing .htaccess in $PWD/app - create now..."

  cat > app/.htaccess <<-'EOF'
				# BEGIN WordPress
				<IfModule mod_rewrite.c>
				RewriteEngine On
				RewriteBase /
				RewriteRule ^index\.php$ - [L]
				RewriteCond %{REQUEST_FILENAME} !-f
				RewriteCond %{REQUEST_FILENAME} !-d
				RewriteRule . /index.php [L]
				</IfModule>
				# END WordPress
			EOF

  echo "SUCCESS: Complete! .htaccess has been successfully created in $PWD/app"
fi
echo "### Ok"


# check wordpress config
echo "### STEP: 4 -- Check wordpress config"
echo
if [[ ! "$(wp core is-installed --allow-root --path=$PWD/app/wp)" ]]; then
  # install core
  wp core install \
  --url="${DOMAIN_NAME}" \
  --title="${APP_NAME}" \
  --admin_user="${ADMIN_USER}" \
  --admin_password="${ADMIN_PASSWORD}" \
  --admin_email="${ADMIN_EMAIL}" \
  --path="$PWD/app/wp"  \
  --allow-root

  # update url
  wp option update \
  siteurl "http://${DOMAIN_NAME}/wp" --path="$PWD/app/wp"  --allow-root
fi
echo "### Ok"

echo "================================================================="
echo "Installation is complete. Your username/password is listed below."
echo ""
echo "Site Url: http://${DOMAIN_NAME}"
echo "Admin Url: http://${DOMAIN_NAME}/wp/wp-admin"
echo "Username: ${ADMIN_USER}"
echo "Password: ${ADMIN_PASSWORD}"
echo ""
echo "================================================================="


#wp core is-installed --allow-root --path=app
#echo $?
# wp core install --url=arkaim.local --title=Arkaim --admin_user=admin --admin_password=admin --admin_email=info@example.com --allow-root
exec "$@"
