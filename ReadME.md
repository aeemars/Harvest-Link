# 1. Navigate into the folder you want to publish
cd /path/to/your/folder

# 2. Initialize it as a Git repository (if not already done)
git init

# 3. Create and switch to your custom branch name
git checkout -b <your-custom-branch-name>

# 4. Stage all files in the folder
git add .

# 5. Commit the files
git commit -m "Initial commit to custom branch"

# 6. Link your local folder to your remote GitHub repository
git remote add origin https://github.com

# 7. Push the files to GitHub using your custom branch name
git push -u origin <your-custom-branch-name>