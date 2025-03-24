#!/bin/bash
set -e

mysql --user=root --password="Br@@5up3r" <<-EOSQL
    GRANT ALL PRIVILEGES ON *.* TO 'bradmin'@'%' IDENTIFIED BY 'Br@@5up3r' WITH GRANT OPTION;
    FLUSH PRIVILEGES;
EOSQL