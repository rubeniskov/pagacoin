ARG JDKVER=8

FROM alpine AS fswatch-builder

RUN apk add --no-cache file git autoconf automake libtool gettext gettext-dev make g++ texinfo curl
ENV FSWATCH_BRANCH master

WORKDIR /opt
RUN git clone https://github.com/emcrisostomo/fswatch.git

WORKDIR /opt/fswatch
RUN git checkout ${FSWATCH_BRANCH}
RUN ./autogen.sh && ./configure --disable-shared --enable-static && make -j && make install




FROM openjdk:${JDKVER}-jdk-alpine

COPY --from=fswatch-builder /usr/local/bin/fswatch  /usr/local/bin/fswatch
COPY --from=fswatch-builder /usr/lib/libintl.so.8 /usr/lib/libintl.so.8
