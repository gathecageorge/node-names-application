FROM node:22

ARG USERNAME=node
ARG WORKSPACE_FOLDER

# Setup tools and update
RUN apt update \
    && export DEBIAN_FRONTEND=noninteractive \
    && apt upgrade -y \
    && apt install -y \
        nano \
        openssh-client \
    # Clean up
    && apt-get autoremove -y \
    && rm -rf /var/lib/apt/lists/*

# Set up user
RUN \
    # Allow root
    echo "Allow sudo access for the user" \
    && apt update \
    && DEBIAN_FRONTEND=noninteractive apt install -y sudo \
    && echo $USERNAME ALL=\(root\) NOPASSWD:ALL > /etc/sudoers.d/$USERNAME \
    && chmod 0440 /etc/sudoers.d/$USERNAME \
    # Set user to use bash instead of sh
    && usermod -s /bin/bash $USERNAME \
    # Create workspace directory
    && mkdir -p $WORKSPACE_FOLDER \
    && chown $USERNAME:$USERNAME $WORKSPACE_FOLDER

# Use user created above
USER $USERNAME