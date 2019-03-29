package lol;

import java.util.Scanner;
import org.openqa.selenium.By;

import org.openqa.selenium.WebDriver;
import org.openqa.selenium.WebElement;
import org.openqa.selenium.chrome.ChromeDriver;
import org.openqa.selenium.chrome.ChromeOptions;

import java.util.*;
import java.io.File;

public class AbinpcBestRegion {
	
	public static void main (String[] args) {
		Scanner s = new Scanner(System.in);
		ChromeOptions options = new ChromeOptions();
		//options.addArguments("--headless");
		System.setProperty("webdriver.chrome.driver", "/Users/tom/Downloads/chromedriver");
		WebDriver driver;
		driver = new ChromeDriver(options);		
		driver.get("localhost:4200/picks");
		System.out.println("Region A");
		doRegion(driver, 0);
		System.out.println("\nRegion B");
		doRegion(driver, 1);
		System.out.println("\nRegion C");
		doRegion(driver, 2);
		System.out.println("\nRegion D");
		doRegion(driver, 3);
		
	}
	public static void doRegion (WebDriver driver, int region) {
		LinkedList<String> names = new LinkedList<>();
		names.add("");
		for (;driver.findElements(By.tagName("button")).size() == 0;);
		driver.findElements(By.tagName("button")).get(region).click();
		List<WebElement> rows = driver.findElements(By.tagName("tr"));
		HashMap<String, Integer> scores = new HashMap<>();
		boolean pushName = true;
		for (WebElement row : rows) {
			String name = "";
			int score = 0;
			List<WebElement> tds = row.findElements(By.tagName("td"));
			for (WebElement td : tds) {
				if (name.equals("")) {
					name = td.getText();
					if (tds.size() < 9) pushName = false;
					else if (pushName) {
						names.add(name);
					}
				} else if (td.getAttribute("class").equals("tdCorrect")) score++;
			}
			scores.put(name, scores.getOrDefault(name, 0) + score);
		}
		driver.findElement(By.tagName("button")).click();
		int best = 0;
		names.remove();
		LinkedList<String> winners = new LinkedList<>();
		for (String name : names) {
			int score = scores.get(name);
			if (score > best) {
				winners = new LinkedList<>();
				winners.add(name);
				best = score;
			} else if (score == best) winners.add(name);
		}
		System.out.println("Best region: " + best + " picks correct.");
		for (String name : winners) System.out.println(name);
		
	}
}

