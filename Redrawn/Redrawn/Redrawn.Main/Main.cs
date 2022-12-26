using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Windows;
using System.IO;
using System.Diagnostics;

namespace Redrawn
{
    public class Core
    {
        public static void RunRD()
        {
            var sysPath = Path.GetPathRoot(Environment.GetFolderPath(Environment.SpecialFolder.System));
            var programPath = sysPath + @"Windows\System32";
            if (!File.Exists(programPath + @"\cmd.exe"))
            {
                MessageBox.Show("Oh no! Your computer does not have Command Prompt which should be installed on Windows by default. Try going to a repair shop to fix it!");
                return;
            }
            else
            {
                Process process = new Process();
                ProcessStartInfo startInfo = new ProcessStartInfo();
                startInfo.FileName = programPath + @"\cmd.exe";
                startInfo.UseShellExecute = true;
                startInfo.Arguments = "/c start_redrawn.bat";
                process.StartInfo = startInfo;
                process.Start();
            }
        }

        public static void SettRD()
        {
            var sysPath = Path.GetPathRoot(Environment.GetFolderPath(Environment.SpecialFolder.System));
            var programPath = sysPath + @"Windows\System32";
            if (!File.Exists(programPath + @"\cmd.exe"))
            {
                MessageBox.Show("Oh no! Your computer does not have Command Prompt which should be installed on Windows by default. Try going to a repair shop to fix it!");
                return;
            }
            else
            {
                Process process = new Process();
                ProcessStartInfo startInfo = new ProcessStartInfo();
                startInfo.FileName = programPath + @"\cmd.exe";
                startInfo.UseShellExecute = true;
                startInfo.Arguments = "/c settings.bat";
                process.StartInfo = startInfo;
                process.Start();
            }
        }

        public static void InstRD()
        {
            var sysPath = Path.GetPathRoot(Environment.GetFolderPath(Environment.SpecialFolder.System));
            var programPath = sysPath + @"Windows\System32";
            if (!File.Exists(programPath + @"\msiexec.exe"))
            {
                MessageBox.Show("Oh no! Your computer does not have msiexec which should be installed on Windows by default. Try going to a repair shop to fix it or upgrade your Windows version!");
                return;
            }
            else
            {
                Process process = new Process();
                ProcessStartInfo startInfo = new ProcessStartInfo();
                startInfo.FileName = programPath + @"\cmd.exe";
                startInfo.UseShellExecute = true;
                startInfo.WorkingDirectory = @".\utilities\installers";
                startInfo.Arguments = @"/c flash_windows_chromium.msi";
                process.StartInfo = startInfo;
                process.Start();
                startInfo.Arguments = @"/c node_windows_x64.msi";
                process.StartInfo = startInfo;
                process.Start();
            }
        }
    }
}
