FROM mcr.microsoft.com/playwright:v1.51.1-jammy AS base

# image used for nightly builds
FROM base AS ci
ARG APP_ENV=ci
USER 1000
COPY --chown=1000:1000 . /tests
COPY --chown=1000:1000 id_ed25519 /home/pwuser/.ssh/
RUN chmod 600 /home/pwuser/.ssh/id_ed25519
RUN cd ./tests && npm install
USER root
RUN rm -f /home/pwuser/.ssh/id_ed25519
WORKDIR /tests
USER 1000
ENTRYPOINT ["npx"]

# local image build for GUI support
FROM base AS local
ARG APP_ENV=local
ENV DEBIAN_FRONTEND=noninteractive
RUN apt-get update
RUN apt-get install -y \
    wget \
    libcanberra-gtk-module \
    libcanberra-gtk3-module
RUN apt-get clean