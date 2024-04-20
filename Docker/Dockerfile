FROM mcr.microsoft.com/playwright:v1.42.1-focal

ENV DEBIAN_FRONTEND noninteractive

RUN apt-get update
RUN apt-get install -y \
    wget \
    libcanberra-gtk-module \
    libcanberra-gtk3-module
RUN apt-get clean