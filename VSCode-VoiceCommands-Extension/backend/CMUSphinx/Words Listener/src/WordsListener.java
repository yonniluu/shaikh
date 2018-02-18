
import java.util.logging.Logger;
import edu.cmu.sphinx.api.Configuration;
import edu.cmu.sphinx.api.LiveSpeechRecognizer;
import edu.cmu.sphinx.api.SpeechResult;

public class WordsListener {

	public static void main(String[] args) throws Exception {
		System.out.print("Welcome!!!");
		// config
		Configuration configuration = new Configuration();
		configuration.setAcousticModelPath("resource:/edu/cmu/sphinx/models/en-us/en-us");
        configuration.setDictionaryPath("resource:/6221.dic");
        configuration.setLanguageModelPath("resource:/6221.lm");

		// disable logs
		Logger cmRootLogger = Logger.getLogger("default.config");
		cmRootLogger.setLevel(java.util.logging.Level.OFF);
		String conFile = System.getProperty("java.util.logging.config.file");
		if (conFile == null) {
			System.setProperty("java.util.logging.config.file", "ignoreAllSphinx4LoggingOutput");
		}
		
		// init and listen
		LiveSpeechRecognizer recognizer = new LiveSpeechRecognizer(configuration);
		recognizer.startRecognition(true);
		while (true) {
			SpeechResult result = recognizer.getResult();
			Convert(result.getHypothesis());
		}
	}

	private static void Convert(String hypothesis) {
		switch(hypothesis) {
		case "COPY":
			System.out.print("copy");
			break;
		case "CUT":
			System.out.print("cut");
			break;
		case "DELETE":
			System.out.print("delete");
			break;
		case "FIND":
			System.out.print("find");
			break;
		case "GO_TO_LINE":
			System.out.print("go to line");
			break;
		case "HELLO_WORLD":
			System.out.print("hello world");
			break;
		case "PASTE":
			System.out.print("paste");
			break;
		case "QUICK_OPEN":
			System.out.print("quick open");
			break;
		case "REDO":
			System.out.print("redo");
			break;
		case "SEARCH":
			System.out.print("search");
			break;
		case "SELECT_ALL":
			System.out.print("select all");
			break;
		case "STOP_LISTEN":
			System.out.print("stop listen");
			break;
		case "UNDO":
			System.out.print("undo");
			break;
        case "WRITE_FOR_LOOP":
            System.out.print("write for loop");
            break;
        case "CHANGE_SIZE_TO_N":
            System.out.print("change size to n");
            break;
        case "VAR_COUNT_EQUALS_ZERO":
            System.out.print("var count equals zero");
            break;
        case "ADD_MARVEL_CHARACTER":
            System.out.print("add marvel character");
            break;
        case "WRITE_RETURN_ZERO":
            System.out.print("write return zero");
            break;
		case "":
			System.out.print("???");
			break;
		default:
			System.out.print("Please repeat");
			break;
		}
	}
}
