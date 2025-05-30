#! /bin/bash
VERSION='1.51.1'
docker inspect playwright-gui:$VERSION > /dev/null 2>&1 || docker build --target=local -t playwright-gui:$VERSION -f \
Dockerfile .
xhost +
docker run --name builder-playwright-gui-$VERSION -it --rm --ipc=host -e DISPLAY=$DISPLAY -e SSH_AUTH_SOCK=/ssh-agent \
--user 1000:1000 --net=host -v /tmp/.X11-unix:/tmp/.X11-unix -v $(pwd):/home/test-project -v $SSH_AUTH_SOCK:/ssh-agent \
-w /home/test-project playwright-gui:$VERSION /bin/bash