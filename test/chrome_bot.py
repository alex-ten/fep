# %% 
from selenium import webdriver
from selenium.common.exceptions import NoSuchElementException, TimeoutException
from selenium.webdriver.common.by import By
from webdriver_manager.chrome import ChromeDriverManager
from selenium.webdriver.chrome.service import Service
from selenium.webdriver.common.action_chains import ActionChains
import pandas as pd


from time import sleep


css = By.CSS_SELECTOR


def get_description(driver):
    meta = driver.find_element(By.XPATH, '/html/head/meta[@itemprop="description"]')
    return meta.get_attribute('content')



# Define website and create a chrome driver to interface with it
url = 'http://localhost:9000/publix/xrDwPPh5enH?PROLIFIC_PID=chrome_bot'
driver = webdriver.Chrome(service = Service(ChromeDriverManager().install()))
driver.get(url)
sleep(1)

# Click the Submit button
description = get_description(driver)
data, data1 = [], []
while 'outro' not in description:
    if driver.find_elements(css, '#proceed'):
        driver.find_element(css, '#proceed').click()
        sleep(2)
    else:
        choice = driver.find_element(css, '#answer-left').click()
        submit = driver.find_element(css, '.submit-button').click()
        actions = ActionChains(driver)
        actions.click(choice)
        data.append(driver.execute_script('return data'))
        data1.append(driver.execute_script('return jatos.studySessionData.currentStage.name'))
        actions.pause(.2)
        actions.click(submit)
        actions.perform()
        sleep(3)
        
    description = get_description(driver)

driver.close()
# %%

cols = 'index,stage,time,fam,stim,rule,rl,rr,rc'.split(',')
df_dict = dict(zip(cols, [[] for _ in cols]))
t0 = data[0]['stimOnset']
for i, d in enumerate(data):
    df_dict['index'].append(i)
    df_dict['stage'].append(data1[i])
    df_dict['time'].append((d['stimOnset'] - t0)/1000)
    df_dict['fam'].append(d['famChoiceInd'])
    df_dict['stim'].append(f"{d['stimFeatures'][0]}-{d['stimFeatures'][1]}")
    df_dict['rule'].append(d['ruleLabel'])
    df_dict['rl'].append(d['responseOrder'][0])
    df_dict['rr'].append(d['responseOrder'][1])
    df_dict['rc'].append(d['correctResponse'])

df = pd.DataFrame(df_dict).set_index('index')
df['correct'] = df.rl.eq(df.rc)
with pd.option_context('display.max_rows', None, 'display.max_columns', None):  # more options can be specified also
    print(df)

print('Counts')
print(df.groupby(['stage', 'fam'])[['time']].count())

print('Stimuli')
with pd.option_context('display.max_rows', None, 'display.max_columns', None):  # more options can be specified also
    print(df.groupby(['stage', 'fam', 'stim'])[['time']].count().sort_index(axis=0, level=[0, 1, 2]))

# %%
