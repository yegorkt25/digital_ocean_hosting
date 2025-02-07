# Use the official PHP Apache image with PHP 8.4
FROM php:8.4-apache

# Install required dependencies
RUN apt-get update && apt-get install -y libpq-dev libicu-dev

# Install PHP extensions
RUN docker-php-ext-install pdo pdo_mysql

# Enable required Apache modules
RUN a2enmod rewrite headers

# Install Composer
RUN curl -sS https://getcomposer.org/installer | php -- --install-dir=/usr/local/bin --filename=composer

# Copy your project files into the container
COPY . /var/www/html/

# Ensure proper permissions
RUN chown -R www-data:www-data /var/www/html && chmod -R 755 /var/www/html

# Install PHP dependencies
RUN composer install

# Set the ServerName to prevent Apache warnings
RUN echo "ServerName localhost" >> /etc/apache2/apache2.conf

# Enable the default Apache site
RUN a2ensite 000-default.conf

# Expose Apache's port 80
EXPOSE 80

# Start Apache in the foreground when the container starts
CMD ["apache2-foreground"]
