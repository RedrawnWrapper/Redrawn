const env = Object.assign(process.env,require("./env"));

if (env.LVM_ENV == "NON_SERVER")
{
  // If this is Redrawn Offline / GoAnimator Environment
  console.log("Environment: Offline");
  require("./server");
} else if (env.LVM_ENV == "SERVER")
{
  // If this is Redrawn Online / Server Environment
  console.log("Environment: Online");
  require("./server");
} else {
  // Otherwise
  console.log("ERROR: Invalid environment");
  process.exit(1);
}
