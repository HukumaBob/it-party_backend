from channels.testing import ChannelsLiveServerTestCase
from selenium import webdriver
from selenium.webdriver.common.action_chains import ActionChains
from selenium.webdriver.common.by import By
from selenium.webdriver.common.keys import Keys
from selenium.webdriver.support.wait import WebDriverWait
from users.models import User
from events.models import Event, City, Speaker, FormTemplate, get_default_fields
from additions.models import Country




class ChatTests(ChannelsLiveServerTestCase):
    serve_static = True  # emulate StaticLiveServerTestCase

    @classmethod
    def setUpClass(cls):
        super().setUpClass()
        try:
            # NOTE: Requires "chromedriver" binary to be installed in $PATH
            cls.driver = webdriver.Chrome()
            # Create test user
            cls.test_user = User.objects.create(email='testuser')
            cls.test_user.set_password('testpass')
            cls.test_user.save()
            # Create test city
            cls.test_country = Country.objects.create(name='Test Country', index = 1)
            cls.test_city = City.objects.create(name='Test City', country_id_id=cls.test_country.id)
            # Create test speaker
            cls.test_speaker = Speaker.objects.create(name='Test Speaker', specialization='Test Specialization', info='Test Info')
            # Create test form template
            cls.test_form_template = FormTemplate.objects.create(name='Test Form Template', fields=get_default_fields())
            # Create test event
            cls.test_event = Event.objects.create(
                name='Test Event',
                date='2024-05-06',
                time='10:00:00',
                city=cls.test_city,
                address='Test Address',
                description='Test Description',
                online=True,
                offline=False,
                form_template=cls.test_form_template,
                created_by=cls.test_user
            )
            cls.test_event.speakers.add(cls.test_speaker)
        except:
            super().tearDownClass()
            raise

    @classmethod
    def tearDownClass(cls):
        cls.driver.quit()
        super().tearDownClass()

    def test_when_chat_message_posted_then_seen_by_everyone_in_same_room(self):
        try:
            self._enter_chat_room("room_1")

            self._open_new_window()
            self._enter_chat_room("room_1")

            self._switch_to_window(0)
            self._post_message("hello", self.test_user.id, self.test_event.id)
            WebDriverWait(self.driver, 2).until(
                lambda _: "hello" in self._chat_log_value,
                "Message was not received by window 1 from window 1",
            )
            self._switch_to_window(1)
            WebDriverWait(self.driver, 2).until(
                lambda _: "hello" in self._chat_log_value,
                "Message was not received by window 2 from window 1",
            )
        finally:
            self._close_all_new_windows()

    def test_when_chat_message_posted_then_not_seen_by_anyone_in_different_room(self):
        try:
            self._enter_chat_room("room_1")

            self._open_new_window()
            self._enter_chat_room("room_2")

            self._switch_to_window(0)
            self._post_message("hello", self.test_user.id, self.test_event.id)
            WebDriverWait(self.driver, 2).until(
                lambda _: "hello" in self._chat_log_value,
                "Message was not received by window 1 from window 1",
            )

            self._switch_to_window(1)
            self._post_message("world", self.test_user.id, self.test_event.id)
            WebDriverWait(self.driver, 2).until(
                lambda _: "world" in self._chat_log_value,
                "Message was not received by window 2 from window 2",
            )
            self.assertTrue(
                "hello" not in self._chat_log_value,
                "Message was improperly received by window 2 from window 1",
            )
        finally:
            self._close_all_new_windows()

    # === Utility ===

    def _enter_chat_room(self, room_name):
        self.driver.get(self.live_server_url + "/chat/")
        ActionChains(self.driver).send_keys(room_name, Keys.ENTER).perform()
        WebDriverWait(self.driver, 2).until(
            lambda _: room_name in self.driver.current_url
        )

    def _open_new_window(self):
        self.driver.execute_script('window.open("about:blank", "_blank");')
        self._switch_to_window(-1)

    def _close_all_new_windows(self):
        while len(self.driver.window_handles) > 1:
            self._switch_to_window(-1)
            self.driver.execute_script("window.close();")
        if len(self.driver.window_handles) == 1:
            self._switch_to_window(0)

    def _switch_to_window(self, window_index):
        self.driver.switch_to.window(self.driver.window_handles[window_index])

    def _post_message(self, message, user_id, event_id):
        print(f"user_id: {user_id}, type: {type(user_id)}")
        print(f"event_id: {event_id}, type: {type(event_id)}")
        self.driver.find_element(By.ID, 'user-id-input').clear()
        self.driver.find_element(By.ID, 'user-id-input').send_keys(user_id)
        self.driver.find_element(By.ID, 'event-id-input').clear()
        self.driver.find_element(By.ID, 'event-id-input').send_keys(event_id)
        ActionChains(self.driver).send_keys(message, Keys.ENTER).perform()
        self.driver.find_element(By.ID, 'chat-message-submit').click()

    @property
    def _chat_log_value(self):
        return self.driver.find_element(
            by=By.CSS_SELECTOR, value="#chat-log"
        ).get_property("value")