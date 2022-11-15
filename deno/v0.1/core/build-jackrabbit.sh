#!/bin/bash

current_dir=`dirname $0`

target_pathname=$current_dir/mod.ts

es_dir=$current_dir/../../../es/v0.1/core
es_pathname=$es_dir/jackrabbit.js

echo $es_dir
echo $es_pathname

test_target_pathname=$current_dir/mod.test.ts

echo $test_target_pathname


test_es_dir=$es_dir/mod.test.js 
test_es_pathname=$es_dir/jackrabbit.test.js 

deno bundle $target_pathname $es_pathname
deno bundle $test_target_pathname $test_es_pathname

deno fmt $current_dir
deno fmt $es_dir