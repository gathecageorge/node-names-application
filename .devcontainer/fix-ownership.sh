#!/bin/bash
if [ $# -ge 1 ]; then
  folder_path="$1"
else
  folder_path="/workspaces"
fi

sudo chown USERNAME:USERNAME $folder_path
