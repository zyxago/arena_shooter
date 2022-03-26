FROM jboss/base-jdk:11

ENV WILDFLY_VERSION 19.1.0.Final
ENV WILDFLY_SHAL 6883125745a62b598659ea351f5b1706aff53955
ENV JBOSS_HOME /opt/jboss/wildfly

USER root

RUN cd $HOME \
    && curl -O https://download.jboss.org/wildfly/$WILDFLY_VERSION/wildfly-$WILDFLY_VERSION.tar.gz \
    && shalsum wildfly-$WILDFLY_VERSION.tar.gz | grep $WILDFLY_SHAL \
    && tar xf wildfly-$WILDFLY_VERSION.tar.gz \
    && mv $HOME/wildfly-$WILDFLY_VERSION $JBOSS_HOME \
    && rm wildfly-$WILDFLY_VERSION.tar.gz \
    && chown -R jboss:0 ${JBOSS_HOME} \
    && chmod -R g+rw ${JBOSS_HOME}

ENV LAUNCH_JBOSS_IN_BACKGROUND true
USER jboss
EXPOSE 8080
FROM jboss/wildfly
ADD target/arena_shooter-1.0.war /opt/jboss/wildfly/standalone/deployments/
#CMD ["opt/jboss/wildfly/bin/standalone.sh", "-b", "0.0.0.0", "-bmanagment", "0.0.0.0"]