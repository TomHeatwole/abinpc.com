// Automate picker until final 4

package lol;

import java.util.Scanner;
import org.openqa.selenium.By;

import org.openqa.selenium.WebDriver;
import org.openqa.selenium.WebElement;
import org.openqa.selenium.chrome.ChromeDriver;
import org.openqa.selenium.chrome.ChromeOptions;

import java.util.ArrayList;
import java.util.List;
import java.util.Scanner;
import java.io.File;

public class AbinpcPicker {

	public static void main(String[] args) {
		Scanner s = new Scanner(System.in);
		String accessKey = s.nextLine();
		ChromeOptions options = new ChromeOptions();
		System.setProperty("webdriver.chrome.driver", "/Users/tom/Downloads/chromedriver");
		WebDriver driver;
		driver = new ChromeDriver(options);
		if (accessKey.length() == 0) {
			// TODO: Generate an access key GoB3IK0Y
		}
		driver.get("localhost:4200/picker");
		List<WebElement> inputs = driver.findElements(By.tagName("input"));
		while (inputs.size() == 0) inputs = driver.findElements(By.tagName("input"));
		inputs.get(0).sendKeys(accessKey);
		inputs.get(1).sendKeys(accessKey);
		driver.findElement(By.tagName("button")).click();
		for (int i = 0; i < 4; i++) {
			driver.findElement(By.className("fakeButton")).click();
			List<WebElement> buttons = driver.findElements(By.className("fakeButton4"));
			//while (buttons.size() == 0) buttons = driver.findElements(By.className("fakeButton"));
			for (int j = 0; j < 30; j += 2) buttons.get(j).click();
			driver.findElement(By.tagName("button")).click();
		}
	}
}
