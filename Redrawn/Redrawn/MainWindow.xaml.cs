using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Windows;
using System.Windows.Controls;
using System.Windows.Data;
using System.Windows.Documents;
using System.Windows.Input;
using System.Windows.Media;
using System.Windows.Media.Imaging;
using System.Windows.Navigation;
using System.Windows.Shapes;
using Redrawn;

namespace Redrawn
{
    /// <summary>
    /// Interaction logic for MainWindow.xaml
    /// </summary>
    public partial class MainWindow : Window
    {
        public MainWindow()
        {
            InitializeComponent();
        }

        private void RunRedrawn(object sender, RoutedEventArgs e)
        {
            Core.RunRD();
        }

        private void RdSettings(object sender, RoutedEventArgs e)
        {
            Core.SettRD();
        }

        private void InstallationBtn(object sender, RoutedEventArgs e)
        {
            Core.InstRD();
        }
    }
}
