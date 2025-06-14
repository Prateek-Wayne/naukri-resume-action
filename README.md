# Naukri Resume Action 📄

A GitHub Action to automatically upload your resume to Naukri.com, keeping your
profile fresh and active—no manual intervention needed! 🚀

## Features ✨

- 🔄 **Scheduled uploads:** Keep your profile active automatically
- 🔐 **Secure credential handling:** Uses GitHub Secrets
- 📂 **Multiple resume support:** Support for multiple resume files
- 🖱️ **Manual trigger:** Instantly update your profile

## Important Note ⚠️

**This action requires a self-hosted runner** in a region where Naukri.com is
accessible. For example, you can use an AWS EC2 instance in the Mumbai region.
GitHub-hosted runners (typically in US/EU) may not work due to Naukri API
restrictions.

## Usage 🛠️

```yaml
name: Update Naukri Resume

on:
  schedule:
    - cron: '0 0 * * *' # Run every day at midnight
  workflow_dispatch: # Manual trigger

jobs:
  upload-resume:
    runs-on: self-hosted # should use self-hosted runner
    steps:
      - name: Checkout repository
        uses: actions/checkout@v4

      - name: Upload resume to Naukri
        uses: Prateek-Wayne/naukri-resume-action@v1.0.1
        with:
          username: ${{ secrets.NAUKRI_USERNAME }}
          password: ${{ secrets.NAUKRI_PASSWORD }}
          profile_id: ${{ secrets.NAUKRI_PROFILE_ID }}
          resume_path: |-
            ./resumes/resume1.pdf
            ./resumes/resume2.pdf
            ./resumes/resume3.pdf
```

See a full example:
[Example Workflow Repository](https://github.com/jethalalCoder/Workflow/blob/main/.github/workflows/upload-resumeMain.yaml)

## Inputs 📝

| Input         | Description                             | Required |
| ------------- | --------------------------------------- | -------- |
| `username`    | Naukri.com login email                  | Yes      |
| `password`    | Naukri.com password                     | Yes      |
| `profile_id`  | Naukri profile ID                       | Yes      |
| `resume_path` | Path(s) to resume file(s), one per line | Yes      |

## Finding Your Profile ID 🔍

Your Naukri profile ID is essential for this action to work correctly. Here's
how to find it:

📹 **Video Guide**:

https://github.com/user-attachments/assets/44f2744e-672d-48b6-b8b7-1de1dfb7217c

## Security 🔒

**Never hardcode credentials.** Use GitHub Secrets:

1. Go to your repository settings
2. Navigate to **Secrets and variables > Actions**
3. Add:
   - `NAUKRI_USERNAME`
   - `NAUKRI_PASSWORD`
   - `NAUKRI_PROFILE_ID`

## Local Testing 🧪

### Using act

Test locally with [act](https://github.com/nektos/act):

```bash
act -j upload-resume -s NAUKRI_USERNAME=your-email -s NAUKRI_PASSWORD=your-password -s NAUKRI_PROFILE_ID=your-profile-id
```

### Direct Local Testing

1. Copy `.env.example` to `.env` and fill in your credentials:
   ```bash
   cp .env.example .env
   # Edit .env with your credentials
   ```
2. Install dependencies and run:
   ```bash
   yarn install
   yarn local-action
   ```

## Contributing 🤝

Contributions welcome!

1. Fork the repo
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Set up your environment (see Local Testing)
4. Make and commit your changes
5. Push and open a Pull Request

## Support ⭐

If you find this action useful, please star the repo! It helps others discover
the project and motivates further development.

## License 📄

MIT
